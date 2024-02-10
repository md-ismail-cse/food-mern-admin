import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";
import Title from "../common/title/Title";
import "./message.css";

const Message = () => {
  // GET MESSAGES
  const [messages, setMessages] = useState([]);
  const [laoding, setLoading] = useState(false);
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
      setMessages(data);
      setLoading(true);
    };
    fatchMessages();
  }, [messages]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = messages.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(messages.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % messages.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // DELETE MESSAGE
  const deleteHandler = (id) => {
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
          .delete(process.env.REACT_APP_SERVER + `/api/admin/messages/${id}`, {
            headers: {
              Authorization: localStorage.getItem("aToken"),
            },
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Message deleted field!",
            });
          });
      }
    });
  };

  // OPEN MESSAGE
  const viewHandler = (id) => {
    axios
      .put(process.env.REACT_APP_SERVER + `/api/admin/messages/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("aToken"),
        },
      })
      .then((response) => {
        window.location.href = `/message/view/${id}`;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Message read status update field!",
        });
      });
  };

  return (
    <div>
      <section className="message content">
        <Title title="Messages" />
        <div className="message-items">
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {laoding ? (
              <>
                {currentItems.length === 0 ? (
                  <tr>
                    <td className="text-center" colSpan="7">
                      No items found!
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr
                      key={index}
                      className={item.read === "No" && "text-bold"}
                    >
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.subject.slice(0, 20)}...</td>
                      <td>{item.phone}</td>
                      <td>{item.message.slice(0, 20)}...</td>
                      <td>{moment(item.date).format("lll")}</td>
                      <td>
                        <Link
                          onClick={() => viewHandler(item._id)}
                          className="btn-success"
                        >
                          <i class="ri-eye-fill"></i>
                        </Link>{" "}
                        <Link
                          onClick={() => deleteHandler(item._id)}
                          className="btn-delete"
                        >
                          <i class="ri-delete-bin-5-fill"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </>
            ) : (
              <tr>
                <td colSpan={7}>
                  <Loader />
                </td>
              </tr>
            )}
          </table>
          {messages.length >= 21 && (
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
      </section>
    </div>
  );
};

export default Message;
