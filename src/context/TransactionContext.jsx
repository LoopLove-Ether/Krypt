import React,{ useEffect,useState } from 'react';//导入钩子
import { ethers } from 'ethers';//ethers可以与智能合约进行交互

import { contractABI,contractAddress } from '../utils/constants';//导入与智能合约的abi和地址

//导出context
export const TransactionContext = React.createContext()

//通过Metamask访问以太坊对象
const {ethereum} = window;

// //解构以太坊对象
// window.ethereum

//通过这个函数来获取我们的以太坊合约
const getEthereumContract = () => {
  
    const provider = new ethers.providers.Web3Provider(ethereum);//从区块链中读取数据需要provider
    const signer = provider.getSigner();//往区块链中写入数据需要签名者
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);//获得合约对象 

    return transactionContract;//Solidity中写的函数都会被返回
}

//让这个箭头函数作为调用其他函数的特定地方
//每个context提供者都需要传入子元素作为参数
export const TransactionProvider = ({children}) => {

    //直接存储在state中的东西
    const [currentAccount, setCurrentAccount] = useState("");
    //useState中是各个属性的对象
    const [formData,setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''});//表单数据
    //添加加载状态
    const [isLoading, setIsLoading] = useState(false);
    //添加交易数量状态
    //将交易数量存储到本地存储中
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    //添加交易列表状态
    const [transactions, setTransactions] = useState([]);


    //动态更新表单数据,这里的e是指事件
    const handleChange = (e,name) => {
        //当我们用新状态更新旧状态时，必须在状态中提供一个回调函数
        setFormData((prevState) => ({...prevState,[name]:e.target.value}))
    };

    //获得交易列表
    const getAllTransactions = async () => {
        try {
        //如果没有以太坊对象的话(检查是否安装了Metamask)
            if(!ethereum) return alert("Please install Metamask");
            const transactionContract = getEthereumContract();//可以使用这个变量来调用所有与合约相关的函数
            const availableTransactions = await transactionContract.getAllTransactions();//返回交易列表
            
            //因为智能合约的结构化数组反馈到前端之后索引顺序有些混乱，这里创建一个新的结构化交易
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount:parseInt(transaction.amount._hex) / (10 ** 18) 
            }));

            console.log(structuredTransactions);

            setTransactions(structuredTransactions);//将结构化交易发送到状态
        } catch (error) {
            console.log(error);//记录错误    
        }
    }


    //关于在开始时检查是否连接钱包的函数
    const checkIfWalletIsConnected = async () => {
        try {
        //如果没有以太坊对象的话(检查是否安装了Metamask)
        if(!ethereum) return alert("Please install Metamask");
        
        const accounts = await ethereum.request({method:'eth_accounts'});//让Metamask连接账户(指定一个包含method的对象)
        
        //检查是否有一个账户
        if(accounts.length) {
            setCurrentAccount(accounts[0]);//设置当前账户等于第一个账户(这样在每次渲染开始时我们都能访问我们的账户)

            //获得所有的交易
            getAllTransactions();
        } else {
            console.log('No accounts found');
        }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    //检查交易是否存在的函数
    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();//可以使用这个变量来调用所有与合约相关的函数
            const transactionCount = await transactionContract.getTransactionCount();//获得交易数量
            window.localStorage.setItem("transactionCount",transactionCount);//将交易数量放在本地存储中

        } catch (error) {
            //提供错误处理
            console.log(error);
            throw new Error("No ethereum object");
        }
    } 

    //通过useEffect来调用函数
    //它只会在应用加载的时候发生
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [])
    
    //连接钱包函数
    const connectWallet = async () => {
        try {
        //如果没有以太坊对象的话(检查是否安装了Metamask)
        if(!ethereum) return alert("Please install Metamask");

        const accounts = await ethereum.request({method:'eth_requestAccounts'});//这样我们就能够得到所有的账户，然后用户就能选择连接其中的一个
        
        setCurrentAccount(accounts[0]);//设置当前账户等于第一个账户
    } catch (error) {
        //提供错误处理
        console.log(error);

        throw new Error("No ethereum object");
    }
}

    //发送交易函数
    //这是我们发送和存储交易的逻辑所在
    const sendTransaction = async () => {
        try {
          //如果没有以太坊对象的话(检查是否安装了Metamask)
          if(!ethereum) return alert("Please install Metamask");
          
          //从Welcome的表单中获取数据
          const {addressTo,amount,keyword,message} = formData;
          const transactionContract = getEthereumContract();//可以使用这个变量来调用所有与合约相关的函数
          const parsedAmount = ethers.utils.parseEther(amount);//赋予将十进制转换为十六进制功能

          //发送一些ETH
          await ethereum.request({
            method:'eth_sendTransaction',
            params:[{
                from:currentAccount,
                to:addressTo,
                gas:'0x5208',//21000Wei
                value:parsedAmount._hex,//从表单数据发送的金额
            }]
          });

          //存储我们的交易并得到交易的哈希值作为交易Id
          //这是一个异步操作,需要一些时间来完成交易
          const transactionHash = await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
          
          //正在加载
          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          //加载完成
          setIsLoading(false);
          console.log(`Success - ${transactionHash.hash}`);

          const transactionCount = await transactionContract.getTransactionCount();//获得交易数量

          setTransactionCount(transactionCount.toNumber());

          window.reload()//在交易完成后重新加载页面
        } catch (error) {
          //提供错误处理
          console.log(error);

          throw new Error("No ethereum object"); 
        }
    }


    return (
        //value是我们传递给应用程序的数据 
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,transactions,isLoading}}>
            {children}
            {/* 渲染子元素意味着我们在这个函数中包装的任何东西都将被呈现 */}
        </TransactionContext.Provider>
    );
} 