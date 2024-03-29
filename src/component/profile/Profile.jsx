import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader/Loader";
import Title from "../common/title/Title";
import "./profile.css";

const Profile = () => {
  // GET ADMIN DETAILS
  const id = localStorage.getItem("aID");
  const [admin, setAdmin] = useState({});
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/users/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("aToken"),
          },
        }
      );
      setAdmin(data);
      setLoading(true);
    };
    fatchAdmin();
  }, [admin, id]);

  return (
    <>
      <section className="profile content">
        <Title title="Profile" />
        <div className="profile-items">
          <div className="left">
            {laoding ? (
              <>
                {!admin.thumb ? (
                  <img src="/img/placeholder.png" alt={admin.name} />
                ) : (
                  <img
                    src={process.env.REACT_APP_SERVER + "/users/" + admin.thumb}
                    alt={admin.name}
                  />
                )}

                <div class="card">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <b>Name: </b> {admin.name}
                    </li>
                    <li class="list-group-item">
                      <b>Username: </b> {admin.username}
                    </li>
                    <li class="list-group-item">
                      <b>Email: </b> {admin.email}
                    </li>
                    <li class="list-group-item">
                      <b>Phone: </b> {admin.phone}
                    </li>
                    <li class="list-group-item">
                      <b>Position: </b> {admin.position}
                    </li>
                    <li class="list-group-item">
                      <b>Joining Date: </b> {moment(admin.date).format("ll")}
                    </li>
                    <li class="list-group-item">
                      <b>Address: </b> {admin.address}
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
          <div className="right">
            <ul>
              <li>
                <Link className="btn-primary" to="/change-details">
                  Edit informations
                </Link>
              </li>
              <li>
                <Link className="btn-primary" to="/change-profile-pic">
                  Change Profile picture
                </Link>
              </li>
              <li>
                <Link className="btn-primary" to="/change-password">
                  Change password
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
