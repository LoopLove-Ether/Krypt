import React,{useContext} from "react";//导入钩子
import {TransactionContext} from "../context/TransactionContext";//导入智能合约逻辑

import dummyData from "../utils/dummyData";//导入虚拟数据

import { shortenAddress } from "../utils/shortenAddress";//导入切片函数

import useFetch from "../hooks/useFetch";//导入获取gif的钩子


//交易卡组件
const TransactionCard = ({addressTo,addressFrom,timestamp,message,keyword,amount,url}) => {
    const gifUrl = useFetch({keyword})

    return (
        <div className="bg-[#181918] m-4 flex flex-1
          2xl:min-w-[450px]
          2xl:max-w-[500px]
          sm:min-w-[270px]
          sm:max-w-[300px]
          flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    {/* 锚标签链接到区块链浏览器 */}
                    <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From:{shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">To:{shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">Amount:{amount} ETH</p>
                    {message && (
                        <>
                            <br/>
                            <p className="text-white text-base">Message:{message}</p>
                        </>
                    )}
                </div>
                 {/* 渲染图像 */}
                 <img
                        src={gifUrl || url}
                        alt="gif"
                        className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
                    />

                    {/* 时间戳 */}
                    <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                        <p className="text-[#37c7da] font-bold">{timestamp}</p>
                    </div>
            </div>
        </div>
    )
}

const Transactions = () => {
    const {currentAccount,transactions} = useContext(TransactionContext);//获得当前账户的状态,交易列表的状态

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">Connect your account to see the latest transactions</h3>
                )}
                {/* Latest Transactions(当我们的账户连接时) */}
                {/* Connect your account to see the latest transactions(当我们的账户未连接时) */}
                {/* 接下来要遍历所有的真实交易 */}
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction,i) => (
                        <TransactionCard key={i} {...transaction}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Transactions;