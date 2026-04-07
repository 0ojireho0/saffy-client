import React, { useState } from "react";
import { X, User, Lock, EyeOff, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function UserSetting({ setShowUserSettingModal }) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const { logout, updateUser } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleClose = () => {
    setShowUserSettingModal(false);
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    logout();
  };

  const handleUpdateAccount = (data) => {
    if (
      data.username === "" &&
      data.password === "" &&
      data.confirmPassword === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "You need to input some fields",
        icon: "warning",
      });
      return;
    }

    setUpdateLoading(true);
    updateUser({
      setLoading: setUpdateLoading,
      setShowUserSettingModal,
      ...data
    })
  };

  return (
    <AnimatePresence>
      <>
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Modal Wrapper */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-[500px] rounded-[28px] bg-[#f8f8f8] px-5 py-6 shadow-2xl sm:px-8 sm:py-8"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 text-[#2c7a73] transition hover:scale-110"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className="mb-8 text-center text-3xl text-[#0B2A26] sailec-bold">
              User Setting
            </h2>

            <form
              onSubmit={handleSubmit(handleUpdateAccount)}
              className="space-y-5"
            >
              {/* Username */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-base font-medium text-[#52726E] sailec-regular">
                  <User size={18} className="text-[#2c7a73]" />
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full rounded-md border border-[#7ca7a1] bg-white px-4 py-3 text-base text-[#9E9E9E] helvetica-regular outline-none transition focus:border-[#2c7a73] focus:ring-2 focus:ring-[#2c7a73]/20"
                  {...register("username")}
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-base font-medium text-[#52726E] sailec-regular">
                  <Lock size={18} className="text-[#2c7a73]" />
                  Update Password
                </label>
                <input
                  type="password"
                  placeholder="**************"
                  className="w-full rounded-md border border-[#7ca7a1] bg-white px-4 py-3 text-base text-[#9E9E9E] helvetica-regular outline-none transition focus:border-[#2c7a73] focus:ring-2 focus:ring-[#2c7a73]/20"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 sailec-regular">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-base font-medium text-[#52726E] sailec-regular">
                  <EyeOff size={18} className="text-[#2c7a73]" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="**************"
                  className="w-full rounded-md border border-[#7ca7a1] bg-white px-4 py-3 text-base text-[#9E9E9E] helvetica-regular outline-none transition focus:border-[#2c7a73] focus:ring-2 focus:ring-[#2c7a73]/20"
                  {...register("confirmPassword", {
                    validate: (value) => {
                      if (password && !value) {
                        return "Confirm Password is required";
                      }
                      if (password && value !== password) {
                        return "Passwords do not match";
                      }
                      return true;
                    },
                  })}
                />

                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 sailec-regular">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Update button */}
              <button
                type="submit"
                disabled={updateLoading}
                className="mt-4 w-full rounded-full bg-[#227369] px-6 py-3 text-lg font-semibold uppercase tracking-wide text-white transition hover:bg-[#24665f] sailec-medium"
              >
                {updateLoading ? "Updating..." : "Update Account"}
              </button>

              {/* Logout button */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FEEEEE] px-6 py-3 text-lg font-semibold uppercase text-[#E01D10] sailec-medium transition hover:bg-[#f1dada]"
              >
                {logoutLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    <LogOut size={20} />
                    Logout
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  );
}