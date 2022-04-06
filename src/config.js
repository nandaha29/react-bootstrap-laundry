const baseUrl = "http://localhost:8000/laundry/api";
const url = `http://localhost:8000/`;
const user_image_url = "http://localhost:8000/image/user";
const member_image_url = "http://localhost:8000/image/member";
const outlet_image_url = "http://localhost:8000/image/outlet";
const detail_image_url = "http://localhost:8000/image/detail";

const authorize = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export { baseUrl, url, user_image_url, member_image_url, outlet_image_url, detail_image_url, authorize };
