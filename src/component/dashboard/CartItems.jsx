import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader/Loader";

const CartItems = () => {
  const [loading, setLoading] = useState(false);
  // Orders
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/orders",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setOrders(data.length);
    };
    fatchOrders();
  }, [orders]);

  // Revenue
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    const fatchRevenue = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/revenue",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setRevenue(data);
    };
    fatchRevenue();
  }, [revenue]);

  // Foods
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fatchFoods = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/foods"
      );
      setFoods(data.length);
    };
    fatchFoods();
  }, [foods]);

  // Categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fatchCategories = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/categories"
      );
      setCategories(data.length);
    };
    fatchCategories();
  }, [categories]);

  // Blogs
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fatchBlogs = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/blogs"
      );
      setBlogs(data.length);
    };
    fatchBlogs();
  }, [blogs]);

  // Customers
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fatchCustomers = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/customers",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setCustomers(data.length);
    };
    fatchCustomers();
  }, [customers]);

  // Delivery Men
  const [deliveryMan, setDeliveryMan] = useState([]);
  useEffect(() => {
    const fatchDeliveryMan = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/delivery-men",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setDeliveryMan(data.length);
    };
    fatchDeliveryMan();
  }, [deliveryMan]);

  // Users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fatchUsers = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/users",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setUsers(data.length);
    };
    fatchUsers();
  }, [users]);

  // Messages
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fatchMessages = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/messages",
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setMessages(data.length);
      setLoading(true);
    };
    fatchMessages();
  }, [messages]);

  return (
    <>
      {loading ? (
        <>
          <div className="dashboard-cards">
            <Link to="/orders">
              <div className="single-card">
                <div className="card-content">
                  <h4>Total Orders</h4>
                  <span>{orders}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-shopping-basket-line"></i>
                </span>
              </div>
            </Link>

            <Link to="/revenue">
              <div className="single-card">
                <div className="card-content">
                  <h4>Revenue</h4>
                  <span>
                    ৳{" "}
                    {revenue.map((item) => (
                      <span>{item._id && item.revenue}</span>
                    ))}
                  </span>
                </div>
                <span className="card-icon">
                  <i class="ri-currency-fill"></i>
                </span>
              </div>
            </Link>

            <Link to="/foods">
              <div className="single-card">
                <div className="card-content">
                  <h4>Foods</h4>
                  <span>{foods}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-service-line"></i>
                </span>
              </div>
            </Link>

            <Link to="/categories">
              <div className="single-card">
                <div className="card-content">
                  <h4>Categories</h4>
                  <span>{categories}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-list-check"></i>
                </span>
              </div>
            </Link>
          </div>

          <div className="dashboard-cards">
            <Link to="/blogs">
              <div className="single-card">
                <div className="card-content">
                  <h4>Blogs</h4>
                  <span>{blogs}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-pages-line"></i>
                </span>
              </div>
            </Link>

            <Link to="/customers">
              <div className="single-card">
                <div className="card-content">
                  <h4>Customers</h4>
                  <span>{customers}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-map-pin-user-fill"></i>
                </span>
              </div>
            </Link>

            <Link to="/delivery-men">
              <div className="single-card">
                <div className="card-content">
                  <h4>Delivery Men</h4>
                  <span>{deliveryMan}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-truck-line"></i>
                </span>
              </div>
            </Link>

            <Link to="/users">
              <div className="single-card">
                <div className="card-content">
                  <h4>Managers</h4>
                  <span>{users}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-team-line"></i>
                </span>
              </div>
            </Link>
          </div>

          <div className="dashboard-cards">
            <Link to="/messages">
              <div className="single-card">
                <div className="card-content">
                  <h4>Total Message</h4>
                  <span>{messages}+</span>
                </div>
                <span className="card-icon">
                  <i class="ri-chat-2-line"></i>
                </span>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CartItems;
