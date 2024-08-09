import { useState } from "react";

const AddTravelCompany = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    phone: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/travel-company/add-TravelCompany",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), //HTTP requests require the request body to be in a string format, so changing the formData object as JSON string
        }
      );
      const result = await response.json();
      if (response.ok) {
        setResult({
          company_name: result.company_name,
          id: result._id,
        });
        setFormData({ company_name: "", email: "", phone: "" });
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg sm:max-w-lg ">
      <h2 className="text-2xl font-semibold mb-6 text-green-500">
        Travel Company Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 ">
          <label className="block text-gray-700" htmlFor="company_name">
            Travel Company Name
          </label>
          <input
            type="text"
            name="company_name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-sm sm:text-base"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter travel company name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="phone">
            Mobile Number
          </label>
          <input
            type="text"
            name="phone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.phone}
            onChange={handleChange}
            placeholder="071 234 5678"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            Email
            {/*  //Makes the element a block-level element, meaning it will take up the full width of its container and start on a new line. */}
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@domain.com"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-300"
        >
          Add Travel Company
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">
            Travel Company Added
          </h3>
          <p className="mt-2 text-gray-700">
            <strong>Travel Company Name:</strong> {result.company_name}
          </p>
          <p className="mt-1 text-gray-700">
            <strong>ID:</strong> {result.id}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddTravelCompany;
