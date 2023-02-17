import React, { useContext } from "react"; //导入钩子

//导入一些图标
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

//导入智能合约逻辑
import { TransactionContext } from "../context/TransactionContext";

//导入Loader组件,因为会有东西加载到这里
import { Loader } from "./";

//导入切片函数
import { shortenAddress } from "../utils/shortenAddress";

//字符串形式的通用样式
const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

//创建输入组件,简化我们的输入表单
const Input = ({ placeholder, name, type, value, handleChange }) => (
  // 增幅步长是0.0001,因为以太坊的价值非常高，所以即使是最小的金额也会产生巨大的差异
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    isLoading,
  } = useContext(TransactionContext); //访问TransactionContext获得传递来的函数

  //提交交易的功能
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData; //获得表单字段

    e.preventDefault(); //通常当我们提交一个表单时，页面会重新加载，但在React应用程序中我们希望防止这种情况发生，这就是我们调用这个函数的原因。
    //检查用户是否填写了字段
    //如果有未填写的话就丢弃这个函数
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const Refresh = (e) => {
    window.location.reload();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto.
          </p>
          {/* 如果没有账户我们就渲染这个按钮 */}
          {/* 如果我们的账户是连接的,我们就不能看到这个按钮 */}
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          {/* 接下来的div是所有功能的网格 */}
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        {/* 接下来的div将是我们桌面欢迎视图的右侧 */}
        {/* 我们的以太坊卡 */}
        <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                {/* 在这个段落中将呈现当前连接到应用程序的区块链钱包的地址 */}
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          {/* 接下来的div是我们的表格单 */}
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            {/* handleChange函数会根据特定输入的name动态更新这些输入,因此name必须与状态中的name完全匹配 */}

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
            >
              Send Now
            </button>
            {/* 加载完成后就提交交易 */}
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={Refresh}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Refresh to view transactions
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
