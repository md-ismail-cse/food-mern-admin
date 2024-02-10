import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../common/title/Title";
import Swal from "sweetalert2";
import Loader from "../common/loader/Loader";

export const EditFood = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [currentThumb, setThumb] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState("");
  const [active, setActive] = useState("");
  const [laoding, setLoading] = useState(false);

  const [food, setFood] = useState({});
  useEffect(() => {
    const fatchFood = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/foods/${id}`
      );
      setFood(data);
      setTitle(data.title);
      setThumb(data.thumb);
      setPrice(data.price);
      setDescription(data.description);
      setCategory(data.category);
      setFeatured(data.featured);
      setActive(data.active);
      setLoading(true);
    };
    fatchFood();
  }, [id]);

  const [selectCategories, setSelectCategories] = useState([]);
  useEffect(() => {
    const fatchSelectCategories = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/categories"
      );
      setSelectCategories(data);
    };
    fatchSelectCategories();
  }, [selectCategories]);

  const submitHandler = (e) => {
    e.preventDefault();
    var newThumb = document.querySelector("#thumb").files[0];
    var thumb;
    if (newThumb) {
      thumb = newThumb;
    } else {
      thumb = currentThumb;
    }
    let updateData = {
      title,
      thumb: thumb,
      price,
      category,
      description,
      featured,
      active,
    };
    axios
      .put(
        process.env.REACT_APP_SERVER +
          `/api/admin/foods/${id}?cthumb=${currentThumb}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Food updated successfull.",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => (window.location.href = "/foods"));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Food update field!",
        });
      });
  };

  // SHOWING UPLOADED IMAGE
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <section className="dashboard content">
        <Title title="Edit Food" />
        <div className="profile-content">
          {laoding ? (
            <form enctype="multipart/form-data" onSubmit={submitHandler}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                class="form-control"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />

              <div class="mb-3">
                {file ? (
                  <img src={file} alt="" />
                ) : (
                  <img
                    src={process.env.REACT_APP_SERVER + "/foods/" + food.thumb}
                    alt=""
                  />
                )}

                <input
                  type="file"
                  name="thumb"
                  onChange={handleThumbChange}
                  id="thumb"
                  class="form-control"
                />
              </div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                class="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                rows="5"
                value={description}
                class="form-control"
                required
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                class="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                {selectCategories.map((item, index) => (
                  <option
                    key={index}
                    value={item.title}
                    selected={food.category === item.title}
                  >
                    {item.title}
                  </option>
                ))}
              </select>
              <div class="mb-3">
                <label htmlFor="features">Featued:</label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="featured"
                  value="on"
                  // checked={food.featured === "on"}
                  onChange={(e) => setFeatured(e.target.value)}
                  required
                />{" "}
                Yes
                <input
                  type="radio"
                  className="form-check-input"
                  name="featured"
                  value="off"
                  // checked={food.featured === "off"}
                  onChange={(e) => setFeatured(e.target.value)}
                  required
                />{" "}
                No
              </div>
              <div class="mb-3">
                <label htmlFor="Active">Active:</label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="active"
                  value="on"
                  // checked={food.active === "on"}
                  onChange={(e) => setActive(e.target.value)}
                />{" "}
                Yes
                <input
                  type="radio"
                  className="form-check-input"
                  name="active"
                  value="off"
                  // checked={food.active === "off"}
                  onChange={(e) => setActive(e.target.value)}
                />{" "}
                No
              </div>
              <input type="submit" value="Update" className="btn-primary" />
            </form>
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </>
  );
};
