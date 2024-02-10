import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";
import Rating from "../common/rating/Rating";
import Title from "../common/title/Title";
import Reviews from "./Reviews";
import "./deliverymen.css";

const SingleDeliveryMen = () => {
  // GET DELIVERY MEN DETAILS
  const { id } = useParams();
  const [deliveryMen, setDeliveryMne] = useState({});
  const [reviews, setReviews] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchDeliveryMen = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/delivery-men/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setDeliveryMne(data);
      setReviews(data.reviews.reverse());
      setLoading(true);
    };
    fatchDeliveryMen();
  }, [deliveryMen, id]);

  // GET ORDERS
  const [orders, setOrders] = useState([]);
  const [laoding2, setLoading2] = useState(false);
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
      const fatchOrders = data.filter((curData) => {
        return curData.delivery_man_id === id;
      });
      setOrders(fatchOrders);
      setLoading2(true);
    };
    fatchOrders();
  }, [orders, id]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // DELIVERY MAN DELETE
  const deleteHandler = (id, thumb) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            process.env.REACT_APP_SERVER +
              `/api/admin/delivery-men/${id}?thumb=${thumb}`,
            {
              headers: {
                Authorization: localStorage.getItem("aToken"),
              },
            }
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: "Man deleted successfull.",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => (window.location.href = "/delivery-men"));
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Man deleted field!",
            });
          });
      }
    });
  };

  return (
    <>
      <section className="single-customer content">
        <Title title="Delivery Man Profile" />
        <div className="profile-items">
          <div className="left">
            {laoding ? (
              <>
                {!deliveryMen.thumb ? (
                  <img src="/img/placeholder.png" alt={deliveryMen.name} />
                ) : (
                  <img
                    src={
                      process.env.REACT_APP_SERVER +
                      "/delivery-men/" +
                      deliveryMen.thumb
                    }
                    alt={deliveryMen.name}
                  />
                )}
                <div class="card">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <b>Name: </b> {deliveryMen.name}
                    </li>
                    <li class="list-group-item">
                      <b>Rating: </b> <Rating rating={deliveryMen.rating} /> (
                      {deliveryMen.totalReviews})
                    </li>
                    <li class="list-group-item">
                      <b>Pending Orders: </b> {deliveryMen.pendingOrders}
                    </li>
                    <li class="list-group-item">
                      <b>Complete Orders: </b> {deliveryMen.completeOrders}
                    </li>
                    <li class="list-group-item">
                      <b>Email: </b> {deliveryMen.email}
                    </li>
                    <li class="list-group-item">
                      <b>Joining Date: </b>{" "}
                      {deliveryMen.date &&
                        moment(deliveryMen.date).format("lll")}
                    </li>
                    <li class="list-group-item">
                      <b>Address: </b> {deliveryMen.address}
                    </li>
                  </ul>
                </div>
                <Link className="btn-primary" to="/delivery-men">
                  BACK
                </Link>{" "}
                <Link
                  onClick={() =>
                    deleteHandler(deliveryMen._id, deliveryMen.thumb)
                  }
                  className="btn-delete"
                >
                  DELETE
                </Link>
              </>
            ) : (
              <Loader />
            )}
          </div>
          <div className="right">
            <table className="customers-order">
              <tr>
                <th>Order ID</th>
                <th>Order date</th>
                <th>Order status</th>
                <th>Action</th>
              </tr>
              {laoding2 ? (
                <>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td className="text-center" colSpan="10">
                        No items found!
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={"/orders/" + item._id}>{item.orderID}</Link>
                        </td>
                        <td>{moment(item.order_date).format("lll")}</td>
                        <td>
                          <span
                            className={
                              (item.status === "Ordered" && "btn-order") ||
                              (item.status === "OnDelivery" && "btn-on-delv") ||
                              (item.status === "Cancelled" && "btn-cncl") ||
                              (item.status === "Delivered" && "btn-delv")
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={"/orders/" + item._id}
                            className="btn-success"
                          >
                            <i class="ri-eye-fill"></i>
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </>
              ) : (
                <tr>
                  <td colSpan={4}>
                    <Loader />
                  </td>
                </tr>
              )}
            </table>
            {orders.length >= 11 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
              />
            )}
          </div>
        </div>
        <div className="reviews">
          <h4 className="text-center">Reviews</h4>
          {laoding ? <Reviews reviews={reviews} /> : <Loader />}
        </div>
      </section>
    </>
  );
};

export default SingleDeliveryMen;
