import { useSelector } from "react-redux";
import DashboardHeader from "../../components/header/DashBoardHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import useGetAllProducts from "../../hooks/product/useGetAllProducts";
import useGetAllCategories from "../../hooks/category/useGetAllCategories";
import Chartt from "../../components/chart/Chartt";
import useGetSales from "../../hooks/order/useGetSales";
import useGetSalesofDay from "../../hooks/order/useGetSalesofDay";

const Dashboard = () => {
  useGetAllProducts("-", "all");
  const { products } = useSelector((state) => state.product);
  const productINstock = products?.products?.filter((p) => p.stock > 0);
  const productOUTstock = products?.products?.filter((p) => p.stock <= 0);
  useGetAllCategories();
  const { categories } = useSelector((state) => state.category);
  useGetSales();
  const { sales } = useSelector((state) => state.order);
  useGetSalesofDay();
  const { salesPerDay } = useSelector((state) => state.order);

  return (
    <div>
      <DashboardHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex-[9] overflow-auto h-[calc(100vh-65px)]">
          <div className="p-3 flex flex-wrap gap-3 justify-center items-center">
            <div className="border min-w-44 p-2 text-center rounded-md">
              <div className="text-3xl font-semibold">
                Profit <span className="text-sm text-gray-500">(per day)</span>
              </div>
              <div className="divider my-2"></div>
              <span className="text-2xl font-medium text-blue-600">
                {salesPerDay?.total ? salesPerDay?.total : 0}$
              </span>
            </div>
            <div className="border min-w-44 p-2 text-center rounded-md">
              <div className="text-3xl font-semibold mb-3">
                Orders <span className="text-sm text-gray-500">(per day)</span>
              </div>
              <div className="divider my-2"></div>
              <span className="text-2xl font-medium text-blue-600">20</span>
            </div>
            <div className="border min-w-44 p-2 text-center rounded-md">
              <div className="text-3xl font-semibold mb-3">
                Products
                <span className="text-sm text-gray-500"> (in stock)</span>
                <div className="divider my-2"></div>
              </div>
              <span className="text-2xl font-medium text-blue-600">
                {productINstock?.length}
              </span>
            </div>
            <div className="border min-w-44 p-2 text-center rounded-md">
              <div className="text-3xl font-semibold mb-3">
                Products
                <span className="text-sm text-gray-500"> (out of stock)</span>
              </div>
              <div className="divider my-2"></div>
              <span className="text-2xl font-medium text-blue-600">
                {productOUTstock?.length}
              </span>
            </div>
            <div className="border min-w-44 p-2 text-center rounded-md">
              <div className="text-3xl font-semibold mb-3">Categories</div>
              <div className="divider my-2"></div>
              <span className="text-2xl font-medium text-blue-600">
                {categories?.length}
              </span>
            </div>
          </div>
          <Chartt data={sales} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
