//导入组件
import { Navbar, Welcome, Footer, Services, Transactions } from "./components";

//由于我们写的是最现代的代码，所以需要把它转换成箭头函数
const App = () => {
  return (
    //具有特定宽度的div
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
