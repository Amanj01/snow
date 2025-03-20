"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { use } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DynamicForm = ({ params }) => {
  const { id } = use(params); // Unwrap params promise
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}`
        );
        setForm(res.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };
    if (id) fetchForm();
  }, [id]);

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    
    // Clear error for this field when user makes a change
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: null,
      }));
    }

    // Email validation
    if (fieldId === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [fieldId]: "Invalid email address",
        }));
      }
    }
  };

  const handleFileChange = (fieldId, event) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: event.target.files[0], // Store file
    }));
    
    // Clear error for this field when user makes a change
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    form.fields.forEach((field) => {
      if (field.isRequired && (formData[field.id] === undefined || formData[field.id] === "" || formData[field.id] === null)) {
        newErrors[field.id] = `${field.label} is required`;
        isValid = false;
      }

      // Email validation
      if (field.type === "email" && formData[field.id]) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData[field.id])) {
          newErrors[field.id] = "Invalid email address";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    const formDataObj = new FormData();
  
    form.fields.forEach((field) => {
      const key = `${field.label} _${field.id}`;
      formDataObj.append(key, formData[field.id]);
    });
  
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}/response`,
        formDataObj
      );
      toast.success("Form submitted successfully!");
      setTimeout(() => {
        router.push("/"); // Redirect to home page after submission
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!form) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-md p-8 w-full max-w-md">
        <div className="flex justify-center">
          This form not longer available.
          
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-28 md:pt-32 lg:pt-36">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold">{form.name}</h2>
            {form.description && (
              <p className="mt-2 text-white opacity-90 text-sm">{form.description}</p>
            )}
          </div>
          
          {/* Form Fields */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="p-6 grid grid-cols-1 gap-3">
              {form.fields && form.fields.map((field) => {
                const optionsArray = field.options ? field.options.split(",") : [];
                return (
                  <div key={field.id} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                      {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {field.type === "text" || field.type === "email" ? (
                      <>
                        <input
                          type={field.type}
                          required={field.isRequired}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          value={formData[field.id] || ""}
                          className={`w-full p-3 border transition duration-200 ${
                            errors[field.id] 
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
                              : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          }`}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                        {errors[field.id] && (
                          <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
                        )}
                      </>
                    ) : field.type === "file" ? (
                      <div className="relative">
                        <input
                          type="file"
                          required={field.isRequired}
                          onChange={(e) => handleFileChange(field.id, e)}
                          className={`w-full p-2 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold ${
                            errors[field.id]
                              ? "text-red-500 file:bg-red-50 file:text-red-700"
                              : "file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                          }`}
                        />
                        {errors[field.id] && (
                          <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
                        )}
                      </div>
                    ) : field.type === "checkbox" ? (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          required={field.isRequired}
                          checked={formData[field.id] || false}
                          onChange={(e) => handleChange(field.id, e.target.checked)}
                          className={`h-5 w-5 focus:ring-blue-500 ${
                            errors[field.id] ? "border-red-500 text-red-600" : "text-blue-600"
                          }`}
                        />
                        <span className="ml-2 text-sm text-gray-600">I agree</span>
                        {errors[field.id] && (
                          <p className="ml-2 text-sm text-red-500">{errors[field.id]}</p>
                        )}
                      </div>
                    ) : field.type === "select" ? (
                      <>
                        <select
                          required={field.isRequired}
                          value={formData[field.id] || ""}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className={`w-full p-3 border bg-white ${
                            errors[field.id]
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          }`}
                        >
                          <option value="">Select an option</option>
                          {optionsArray.map((option, idx) => (
                            <option key={idx} value={option.trim()}>
                              {option.trim()}
                            </option>
                          ))}
                        </select>
                        {errors[field.id] && (
                          <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
                        )}
                      </>
                    ) : field.type === "multi-select" ? (
                      <MultiSelectDropdown
                        field={field}
                        formData={formData}
                        handleChange={handleChange}
                        errors={errors}
                      />
                    ) : field.type === "date" ? (
                      <>
                        <input
                          type="date"
                          required={field.isRequired}
                          value={formData[field.id] || ""}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className={`w-full p-3 border ${
                            errors[field.id]
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          }`}
                        />
                        {errors[field.id] && (
                          <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
                        )}
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Submit button */}
            <div className="px-6 pb-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Form"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const MultiSelectDropdown = ({ field, formData, handleChange, errors }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value) => {
    const selectedOptions = formData[field.id] || [];
    if (selectedOptions.includes(value)) {
      handleChange(field.id, selectedOptions.filter((option) => option !== value));
    } else {
      handleChange(field.id, [...selectedOptions, value]);
    }
  };

  return (
    <div className="relative">
      <div
        className={`w-full p-3 border bg-white cursor-pointer ${
          errors[field.id]
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }`}
        onClick={toggleDropdown}
      >
        {formData[field.id] && formData[field.id].length > 0
          ? formData[field.id].join(", ")
          : "Select options"}
        <span className="float-right">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1">
          {field.options.split(",").map((option, idx) => (
            <div
              key={idx}
              className={`p-2 cursor-pointer flex items-center hover:bg-gray-100 ${
                formData[field.id] && formData[field.id].includes(option.trim())
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() => handleOptionChange(option.trim())}
            >
              <input
                type="checkbox"
                checked={formData[field.id] && formData[field.id].includes(option.trim())}
                onChange={() => handleOptionChange(option.trim())}
                className="mr-2"
              />
              {option.trim()}
            </div>
          ))}
        </div>
      )}
      {errors[field.id] && (
        <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
      )}
      <p className="mt-1 text-sm text-gray-500">You can select more than one option</p>
    </div>
  );
};

export default DynamicForm;