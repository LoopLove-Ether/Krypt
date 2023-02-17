import React from "react";
//导入一些图标
import {BsShieldFillCheck} from "react-icons/bs";
import {BiSearchAlt} from "react-icons/bi";
import {RiHeart2Fill} from "react-icons/ri";

//服务卡组件,增加复用性
const ServiceCard = ({color,title,icon,subtitle}) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{title}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
        </div>
    </div>
)


const Services = () => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
                      Services that we
                      <br/>
                      continue to improve
                    </h1>
                </div>
            </div>
            {/* 服务卡 */}
            {/* 服务卡要使用三次,唯一要改变的就是标题,副标题,图标和颜色 */}
            <div className="flex-1 flex flex-col justify-start items-center width:100px; height:80px; border:1px ">
                <ServiceCard 
                    color="bg-[#2952E3]"
                    title="Security Guaranteed"
                    icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
                    subtitle="Security is guaranteed.We always maintain privacy and mainting the quality of our products.                                    "
                />
                <ServiceCard 
                    color="bg-[#F84550]"
                    title="Fastest transactions"
                    icon={<RiHeart2Fill fontSize={21} className="text-white" />}
                    subtitle="The transaction speed can almost be the same as the L1 main chain transaction. The delay is less than 5ms.                     "
                />
                <ServiceCard 
                    color="bg-[#8945F8]"
                    title="Best exchange rates"
                    icon={<BiSearchAlt fontSize={21} className="text-white" />}
                    subtitle="Cooperate with a number of data providers to provide the most reasonable and most suitable transaction exchange rate for users."
                />
            </div>
            
        </div>
    );
}

export default Services;