import { useState } from 'react';//导入钩子

//导入一些图标
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

//导入logo
//Krypt logo(氪星)
import logo from '../../images/logo.png';

//创建导航栏项的一个简单功能性组件
//title这些是它的属性
//这个组件要做的就是返回一个列表项
const NavbarItem = ({ title,classProps }) => {
    return(
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}


const Navbar = () => {
    //设定一个状态,指示移动导航栏当前是否打开
    const [toggleMenu,setToggleMenu] = useState(false);
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="flex-[0.5] flex-initial justify-center items-center">
                {/* 渲染Logo */}
                <img src={logo} alt="logo" className="w-32 cursor-pointer"/>
            </div>
            {/* 有序列表 */}
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {/* 动态代码块块 */}
                {/* 市场,交易,教程,钱包 */}
                {/* 在map函数的参数中,我们要传递循环的对象,特定循环的索引 */}
                {["Market","Exchange","Tutorials","Wallets"].map((item,index) => (
                    // item+index的键值是唯一的
                    <NavbarItem key={item + index} title={item}/>
                ))}
                {/* 假设人们可以登录到我们的应用程序 hover是悬停效果*/}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                  Login  
                </li>    
            </ul>
            {/* 实现移动设备的导航栏 */}
            <div className="fflex relative">
                {/* 动态代码块检查toggleMenu当前是否打开 */}
                {/* onClick后方跟的是回调函数 */}
                {toggleMenu
                  ?<AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                  :<HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />}
                {/* 当菜单被打开时我们需要能显示它 */}
                {toggleMenu && (
                    //在ul中为移动导航栏提供className
                    <ul
                      className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                      flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
                      "
                    >
                      <li className="text-xl w-full my-2">
                        <AiOutlineClose onClick={() => setToggleMenu(false)} />
                      </li>
                      {/* 在导航栏打开的情况下,在导航栏下面我们需要再次遍历所有项目 */}
                      {["Market","Exchange","Tutorials","Wallets"].map((item,index) => (
                    // item+index的键值是唯一的
                    <NavbarItem key={item + index} title={item} classProps = "my-2 text-lg"/>
                    ))}
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;