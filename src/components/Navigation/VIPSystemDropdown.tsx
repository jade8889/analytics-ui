"use client";
import useChain from "@/src/hooks/useChain";
import { chains } from "@/src/statics/helpers/chains";
import { useRouter } from "next/navigation";
import { Address, useContractWrite } from "wagmi";

export default function VIPSystemDropdown() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/point"); // Navigate to the '/point' page
  };

  const chainId = useChain();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: chains[chainId].contracts.jadePointSystem.address as Address,
    abi: chains[chainId].contracts.jadePointSystem.abi,
    functionName: "claimRPoints",
  });

  const cliamRPoint = async () => {
    write();
  };

  return (
    <div className="absolute right-0 z-10 p-2 mt-2 text-white bg-black rounded-lg shadow-lg w-72">
      {/* Menu Item: Instant Rakeback */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="rounded-full ">
            {/* Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_678_2540)">
                <path
                  d="M12 3C14.3137 3 16.4562 3.40832 18.0577 4.10897C18.8569 4.45864 19.5665 4.90083 20.0903 5.44258C20.5747 5.94359 20.9354 6.57081 20.9922 7.29894L21 7.5V17.5C21 18.3141 20.6187 19.0109 20.0903 19.5574C19.5665 20.0992 18.8569 20.5414 18.0577 20.891C16.4562 21.5917 14.3137 22 12 22C9.6863 22 7.54381 21.5917 5.94233 20.891C5.14307 20.5414 4.43348 20.0992 3.90973 19.5574C3.42536 19.0564 3.06458 18.4292 3.00781 17.7011L3 17.5V7.5C3 6.68589 3.38133 5.98914 3.90973 5.44258C4.43348 4.90083 5.14307 4.45864 5.94233 4.10897C7.54381 3.40832 9.6863 3 12 3ZM19 15.4071C18.7059 15.5847 18.3895 15.7458 18.0577 15.891C16.4562 16.5917 14.3137 17 12 17C9.6863 17 7.54381 16.5917 5.94233 15.891C5.61046 15.7458 5.29406 15.5847 5 15.4071V17.5C5 17.6524 5.06638 17.8764 5.34763 18.1673C5.63353 18.463 6.09551 18.775 6.74396 19.0587C8.03791 19.6248 9.89543 20 12 20C14.1046 20 15.9621 19.6248 17.256 19.0587C17.9045 18.775 18.3665 18.463 18.6524 18.1673C18.9336 17.8764 19 17.6524 19 17.5V15.4071ZM19 10.4071C18.7059 10.5847 18.3895 10.7458 18.0577 10.891C16.4562 11.5917 14.3137 12 12 12C9.6863 12 7.54381 11.5917 5.94233 10.891C5.61046 10.7458 5.29406 10.5847 5 10.4071V12.5C5 12.6524 5.06638 12.8764 5.34763 13.1673C5.63353 13.463 6.09551 13.775 6.74396 14.0587C8.03791 14.6248 9.89543 15 12 15C14.1046 15 15.9621 14.6248 17.256 14.0587C17.9045 13.775 18.3665 13.463 18.6524 13.1673C18.9336 12.8764 19 12.6524 19 12.5V10.4071ZM12 5C9.89543 5 8.03791 5.37518 6.74396 5.94128C6.09551 6.22498 5.63353 6.53698 5.34763 6.8327C5.06638 7.12362 5 7.34762 5 7.5C5 7.65238 5.06638 7.87638 5.34763 8.1673C5.63353 8.46302 6.09551 8.77502 6.74396 9.05872C8.03791 9.62482 9.89543 10 12 10C14.1046 10 15.9621 9.62482 17.256 9.05872C17.9045 8.77502 18.3665 8.46302 18.6524 8.1673C18.9336 7.87638 19 7.65238 19 7.5C19 7.34762 18.9336 7.12362 18.6524 6.8327C18.3665 6.53698 17.9045 6.22498 17.256 5.94128C15.9621 5.37518 14.1046 5 12 5Z"
                  fill="white"
                />
                <path
                  d="M12 3C14.3137 3 16.4562 3.40832 18.0577 4.10897C18.8569 4.45864 19.5665 4.90083 20.0903 5.44258C20.5747 5.94359 20.9354 6.57081 20.9922 7.29894L21 7.5V17.5C21 18.3141 20.6187 19.0109 20.0903 19.5574C19.5665 20.0992 18.8569 20.5414 18.0577 20.891C16.4562 21.5917 14.3137 22 12 22C9.6863 22 7.54381 21.5917 5.94233 20.891C5.14307 20.5414 4.43348 20.0992 3.90973 19.5574C3.42536 19.0564 3.06458 18.4292 3.00781 17.7011L3 17.5V7.5C3 6.68589 3.38133 5.98914 3.90973 5.44258C4.43348 4.90083 5.14307 4.45864 5.94233 4.10897C7.54381 3.40832 9.6863 3 12 3ZM19 15.4071C18.7059 15.5847 18.3895 15.7458 18.0577 15.891C16.4562 16.5917 14.3137 17 12 17C9.6863 17 7.54381 16.5917 5.94233 15.891C5.61046 15.7458 5.29406 15.5847 5 15.4071V17.5C5 17.6524 5.06638 17.8764 5.34763 18.1673C5.63353 18.463 6.09551 18.775 6.74396 19.0587C8.03791 19.6248 9.89543 20 12 20C14.1046 20 15.9621 19.6248 17.256 19.0587C17.9045 18.775 18.3665 18.463 18.6524 18.1673C18.9336 17.8764 19 17.6524 19 17.5V15.4071ZM19 10.4071C18.7059 10.5847 18.3895 10.7458 18.0577 10.891C16.4562 11.5917 14.3137 12 12 12C9.6863 12 7.54381 11.5917 5.94233 10.891C5.61046 10.7458 5.29406 10.5847 5 10.4071V12.5C5 12.6524 5.06638 12.8764 5.34763 13.1673C5.63353 13.463 6.09551 13.775 6.74396 14.0587C8.03791 14.6248 9.89543 15 12 15C14.1046 15 15.9621 14.6248 17.256 14.0587C17.9045 13.775 18.3665 13.463 18.6524 13.1673C18.9336 12.8764 19 12.6524 19 12.5V10.4071ZM12 5C9.89543 5 8.03791 5.37518 6.74396 5.94128C6.09551 6.22498 5.63353 6.53698 5.34763 6.8327C5.06638 7.12362 5 7.34762 5 7.5C5 7.65238 5.06638 7.87638 5.34763 8.1673C5.63353 8.46302 6.09551 8.77502 6.74396 9.05872C8.03791 9.62482 9.89543 10 12 10C14.1046 10 15.9621 9.62482 17.256 9.05872C17.9045 8.77502 18.3665 8.46302 18.6524 8.1673C18.9336 7.87638 19 7.65238 19 7.5C19 7.34762 18.9336 7.12362 18.6524 6.8327C18.3665 6.53698 17.9045 6.22498 17.256 5.94128C15.9621 5.37518 14.1046 5 12 5Z"
                  fill="url(#paint0_linear_678_2540)"
                />
                <path
                  d="M12 3C14.3137 3 16.4562 3.40832 18.0577 4.10897C18.8569 4.45864 19.5665 4.90083 20.0903 5.44258C20.5747 5.94359 20.9354 6.57081 20.9922 7.29894L21 7.5V17.5C21 18.3141 20.6187 19.0109 20.0903 19.5574C19.5665 20.0992 18.8569 20.5414 18.0577 20.891C16.4562 21.5917 14.3137 22 12 22C9.6863 22 7.54381 21.5917 5.94233 20.891C5.14307 20.5414 4.43348 20.0992 3.90973 19.5574C3.42536 19.0564 3.06458 18.4292 3.00781 17.7011L3 17.5V7.5C3 6.68589 3.38133 5.98914 3.90973 5.44258C4.43348 4.90083 5.14307 4.45864 5.94233 4.10897C7.54381 3.40832 9.6863 3 12 3ZM19 15.4071C18.7059 15.5847 18.3895 15.7458 18.0577 15.891C16.4562 16.5917 14.3137 17 12 17C9.6863 17 7.54381 16.5917 5.94233 15.891C5.61046 15.7458 5.29406 15.5847 5 15.4071V17.5C5 17.6524 5.06638 17.8764 5.34763 18.1673C5.63353 18.463 6.09551 18.775 6.74396 19.0587C8.03791 19.6248 9.89543 20 12 20C14.1046 20 15.9621 19.6248 17.256 19.0587C17.9045 18.775 18.3665 18.463 18.6524 18.1673C18.9336 17.8764 19 17.6524 19 17.5V15.4071ZM19 10.4071C18.7059 10.5847 18.3895 10.7458 18.0577 10.891C16.4562 11.5917 14.3137 12 12 12C9.6863 12 7.54381 11.5917 5.94233 10.891C5.61046 10.7458 5.29406 10.5847 5 10.4071V12.5C5 12.6524 5.06638 12.8764 5.34763 13.1673C5.63353 13.463 6.09551 13.775 6.74396 14.0587C8.03791 14.6248 9.89543 15 12 15C14.1046 15 15.9621 14.6248 17.256 14.0587C17.9045 13.775 18.3665 13.463 18.6524 13.1673C18.9336 12.8764 19 12.6524 19 12.5V10.4071ZM12 5C9.89543 5 8.03791 5.37518 6.74396 5.94128C6.09551 6.22498 5.63353 6.53698 5.34763 6.8327C5.06638 7.12362 5 7.34762 5 7.5C5 7.65238 5.06638 7.87638 5.34763 8.1673C5.63353 8.46302 6.09551 8.77502 6.74396 9.05872C8.03791 9.62482 9.89543 10 12 10C14.1046 10 15.9621 9.62482 17.256 9.05872C17.9045 8.77502 18.3665 8.46302 18.6524 8.1673C18.9336 7.87638 19 7.65238 19 7.5C19 7.34762 18.9336 7.12362 18.6524 6.8327C18.3665 6.53698 17.9045 6.22498 17.256 5.94128C15.9621 5.37518 14.1046 5 12 5Z"
                  stroke="black"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_678_2540"
                  x1="3"
                  y1="12.5"
                  x2="21"
                  y2="12.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E5C96F" />
                  <stop offset="0.51" stop-color="#D7B45C" />
                  <stop offset="1" stop-color="#C59124" />
                </linearGradient>
                <clipPath id="clip0_678_2540">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span className="text-sm font-medium">Instant Rakeback</span>
        </div>
        <button
          disabled={isLoading}
          onClick={() => cliamRPoint()}
          className="px-3 py-1 text-xs text-black bg-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Claim
        </button>
      </div>

      {/* Menu Item: Daily Bonus */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="rounded-full">
            {/* Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 23C9.70017 23.0072 10.8898 22.776 12 22.32C13.109 22.7799 14.2995 23.0112 15.5 23C19.145 23 22 21.055 22 18.571V14.429C22 11.945 19.145 10 15.5 10C15.331 10 15.165 10.008 15 10.017V5.333C15 2.9 12.145 1 8.5 1C4.855 1 2 2.9 2 5.333V18.667C2 21.1 4.855 23 8.5 23ZM20 18.571C20 19.72 18.152 21 15.5 21C12.848 21 11 19.72 11 18.571V17.646C12.3542 18.4696 13.9153 18.8897 15.5 18.857C17.0847 18.8897 18.6458 18.4696 20 17.646V18.571ZM15.5 12C18.152 12 20 13.28 20 14.429C20 15.578 18.152 16.857 15.5 16.857C12.848 16.857 11 15.577 11 14.429C11 13.281 12.848 12 15.5 12ZM8.5 3C11.152 3 13 4.23 13 5.333C13 6.436 11.152 7.667 8.5 7.667C5.848 7.667 4 6.437 4 5.333C4 4.229 5.848 3 8.5 3ZM4 8.482C5.35986 9.28958 6.91876 9.70009 8.5 9.667C10.0812 9.70009 11.6401 9.28958 13 8.482V10.33C11.9102 10.6047 10.9107 11.1585 10.1 11.937C9.57422 12.0508 9.03795 12.1091 8.5 12.111C5.848 12.111 4 10.881 4 9.778V8.482ZM4 12.927C5.36015 13.7338 6.91891 14.1439 8.5 14.111C8.678 14.111 8.85 14.089 9.025 14.08C9.0101 14.1958 9.00176 14.3123 9 14.429V16.514C8.832 16.524 8.67 16.556 8.5 16.556C5.848 16.556 4 15.326 4 14.222V12.927ZM4 17.371C5.35986 18.1786 6.91876 18.5891 8.5 18.556C8.668 18.556 8.833 18.543 9 18.535V18.571C9.01431 19.4223 9.34144 20.2385 9.919 20.864C9.45111 20.9523 8.97615 20.9979 8.5 21C5.848 21 4 19.77 4 18.667V17.371Z"
                fill="white"
              />
              <path
                d="M8.5 23C9.70017 23.0072 10.8898 22.776 12 22.32C13.109 22.7799 14.2995 23.0112 15.5 23C19.145 23 22 21.055 22 18.571V14.429C22 11.945 19.145 10 15.5 10C15.331 10 15.165 10.008 15 10.017V5.333C15 2.9 12.145 1 8.5 1C4.855 1 2 2.9 2 5.333V18.667C2 21.1 4.855 23 8.5 23ZM20 18.571C20 19.72 18.152 21 15.5 21C12.848 21 11 19.72 11 18.571V17.646C12.3542 18.4696 13.9153 18.8897 15.5 18.857C17.0847 18.8897 18.6458 18.4696 20 17.646V18.571ZM15.5 12C18.152 12 20 13.28 20 14.429C20 15.578 18.152 16.857 15.5 16.857C12.848 16.857 11 15.577 11 14.429C11 13.281 12.848 12 15.5 12ZM8.5 3C11.152 3 13 4.23 13 5.333C13 6.436 11.152 7.667 8.5 7.667C5.848 7.667 4 6.437 4 5.333C4 4.229 5.848 3 8.5 3ZM4 8.482C5.35986 9.28958 6.91876 9.70009 8.5 9.667C10.0812 9.70009 11.6401 9.28958 13 8.482V10.33C11.9102 10.6047 10.9107 11.1585 10.1 11.937C9.57422 12.0508 9.03795 12.1091 8.5 12.111C5.848 12.111 4 10.881 4 9.778V8.482ZM4 12.927C5.36015 13.7338 6.91891 14.1439 8.5 14.111C8.678 14.111 8.85 14.089 9.025 14.08C9.0101 14.1958 9.00176 14.3123 9 14.429V16.514C8.832 16.524 8.67 16.556 8.5 16.556C5.848 16.556 4 15.326 4 14.222V12.927ZM4 17.371C5.35986 18.1786 6.91876 18.5891 8.5 18.556C8.668 18.556 8.833 18.543 9 18.535V18.571C9.01431 19.4223 9.34144 20.2385 9.919 20.864C9.45111 20.9523 8.97615 20.9979 8.5 21C5.848 21 4 19.77 4 18.667V17.371Z"
                fill="url(#paint0_linear_678_2552)"
              />
              <path
                d="M8.5 23C9.70017 23.0072 10.8898 22.776 12 22.32C13.109 22.7799 14.2995 23.0112 15.5 23C19.145 23 22 21.055 22 18.571V14.429C22 11.945 19.145 10 15.5 10C15.331 10 15.165 10.008 15 10.017V5.333C15 2.9 12.145 1 8.5 1C4.855 1 2 2.9 2 5.333V18.667C2 21.1 4.855 23 8.5 23ZM20 18.571C20 19.72 18.152 21 15.5 21C12.848 21 11 19.72 11 18.571V17.646C12.3542 18.4696 13.9153 18.8897 15.5 18.857C17.0847 18.8897 18.6458 18.4696 20 17.646V18.571ZM15.5 12C18.152 12 20 13.28 20 14.429C20 15.578 18.152 16.857 15.5 16.857C12.848 16.857 11 15.577 11 14.429C11 13.281 12.848 12 15.5 12ZM8.5 3C11.152 3 13 4.23 13 5.333C13 6.436 11.152 7.667 8.5 7.667C5.848 7.667 4 6.437 4 5.333C4 4.229 5.848 3 8.5 3ZM4 8.482C5.35986 9.28958 6.91876 9.70009 8.5 9.667C10.0812 9.70009 11.6401 9.28958 13 8.482V10.33C11.9102 10.6047 10.9107 11.1585 10.1 11.937C9.57422 12.0508 9.03795 12.1091 8.5 12.111C5.848 12.111 4 10.881 4 9.778V8.482ZM4 12.927C5.36015 13.7338 6.91891 14.1439 8.5 14.111C8.678 14.111 8.85 14.089 9.025 14.08C9.0101 14.1958 9.00176 14.3123 9 14.429V16.514C8.832 16.524 8.67 16.556 8.5 16.556C5.848 16.556 4 15.326 4 14.222V12.927ZM4 17.371C5.35986 18.1786 6.91876 18.5891 8.5 18.556C8.668 18.556 8.833 18.543 9 18.535V18.571C9.01431 19.4223 9.34144 20.2385 9.919 20.864C9.45111 20.9523 8.97615 20.9979 8.5 21C5.848 21 4 19.77 4 18.667V17.371Z"
                stroke="black"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_678_2552"
                  x1="2"
                  y1="12.0002"
                  x2="22"
                  y2="12.0002"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E5C96F" />
                  <stop offset="0.51" stop-color="#D7B45C" />
                  <stop offset="1" stop-color="#C59124" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-sm font-medium">Daily Bonus</span>
        </div>
        <button
          disabled={isLoading}
          onClick={() => cliamRPoint()}
          className="px-3 py-1 text-xs text-black bg-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Claim
        </button>
      </div>

      {/* Menu Item: Weekly Bonus */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="rounded-full">
            {/* Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.84C12 5.62 11.17 6.32 9.89 6.75C8.87747 7.08417 7.81612 7.24641 6.75 7.23C5.68388 7.24641 4.62253 7.08417 3.61 6.75C2.33 6.32 1.5 5.62 1.5 4.84M12 4.84C12 3.52 9.65 2.45 6.75 2.45C3.85 2.45 1.5 3.52 1.5 4.84M12 4.84V8.66M1.5 4.84V8.66M12 8.66C12 9.44 11.17 10.14 9.89 10.57C8.87632 10.8993 7.81578 11.0615 6.75 11.05C5.68422 11.0615 4.62368 10.8993 3.61 10.57C2.33 10.14 1.5 9.44 1.5 8.66M12 8.66V12.48M1.5 8.66V12.48M12 12.48C12 13.26 11.17 13.96 9.89 14.39M12 12.48V16.3M12 12.48C12 13.26 11.17 14 9.89 14.39M12 12.48C12 13.26 12.83 13.96 14.11 14.39M12 12.48V20.11M12 12.48C12 13.26 12.83 14 14.11 14.39M12 12.48C12 11.7 12.69 11.12 13.78 10.68C14.7358 11.5305 15.9706 12.0003 17.25 12.0003C18.5294 12.0003 19.7642 11.5305 20.72 10.68C21.81 11.12 22.5 11.76 22.5 12.48M9.89 14.39C8.87568 14.7156 7.81521 14.8743 6.75 14.86C5.68479 14.8743 4.62432 14.7156 3.61 14.39M3.61 14.39C2.33 14 1.5 13.26 1.5 12.48M3.61 14.39C2.33 13.96 1.5 13.26 1.5 12.48M1.5 12.48V16.3C1.5 17.61 3.85 18.68 6.75 18.68C9.65 18.68 12 17.61 12 16.3M1.5 12.48V20.11C1.5 21.43 3.85 22.5 6.75 22.5C9.65 22.5 12 21.43 12 20.11M12 16.3C12 17.61 14.35 18.68 17.25 18.68C20.15 18.68 22.5 17.61 22.5 16.3V12.48M22.5 12.48C22.5 13.26 21.67 14 20.39 14.39M22.5 12.48C22.5 13.26 21.67 13.96 20.39 14.39M14.11 14.39C15.1243 14.7156 16.1848 14.8743 17.25 14.86C18.3152 14.8743 19.3757 14.7156 20.39 14.39M12 20.11C12 21.43 14.35 22.5 17.25 22.5C20.15 22.5 22.5 21.43 22.5 20.11V13.48M22.5 6.75C22.5 7.78835 22.1921 8.80338 21.6152 9.66674C21.0383 10.5301 20.2184 11.203 19.2591 11.6004C18.2998 11.9977 17.2442 12.1017 16.2258 11.8991C15.2074 11.6965 14.2719 11.1965 13.5377 10.4623C12.8035 9.72808 12.3035 8.79262 12.1009 7.77422C11.8983 6.75582 12.0023 5.70022 12.3996 4.74091C12.797 3.7816 13.4699 2.96166 14.3333 2.38478C15.1966 1.80791 16.2117 1.5 17.25 1.5C17.9413 1.49332 18.627 1.62455 19.267 1.88602C19.9069 2.1475 20.4884 2.53396 20.9772 3.0228C21.466 3.51164 21.8525 4.09306 22.114 4.73303C22.3754 5.37301 22.5067 6.0587 22.5 6.75Z"
                stroke="white"
                strokeWidth="0.9"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <path
                d="M12 4.84C12 5.62 11.17 6.32 9.89 6.75C8.87747 7.08417 7.81612 7.24641 6.75 7.23C5.68388 7.24641 4.62253 7.08417 3.61 6.75C2.33 6.32 1.5 5.62 1.5 4.84M12 4.84C12 3.52 9.65 2.45 6.75 2.45C3.85 2.45 1.5 3.52 1.5 4.84M12 4.84V8.66M1.5 4.84V8.66M12 8.66C12 9.44 11.17 10.14 9.89 10.57C8.87632 10.8993 7.81578 11.0615 6.75 11.05C5.68422 11.0615 4.62368 10.8993 3.61 10.57C2.33 10.14 1.5 9.44 1.5 8.66M12 8.66V12.48M1.5 8.66V12.48M12 12.48C12 13.26 11.17 13.96 9.89 14.39M12 12.48V16.3M12 12.48C12 13.26 11.17 14 9.89 14.39M12 12.48C12 13.26 12.83 13.96 14.11 14.39M12 12.48V20.11M12 12.48C12 13.26 12.83 14 14.11 14.39M12 12.48C12 11.7 12.69 11.12 13.78 10.68C14.7358 11.5305 15.9706 12.0003 17.25 12.0003C18.5294 12.0003 19.7642 11.5305 20.72 10.68C21.81 11.12 22.5 11.76 22.5 12.48M9.89 14.39C8.87568 14.7156 7.81521 14.8743 6.75 14.86C5.68479 14.8743 4.62432 14.7156 3.61 14.39M3.61 14.39C2.33 14 1.5 13.26 1.5 12.48M3.61 14.39C2.33 13.96 1.5 13.26 1.5 12.48M1.5 12.48V16.3C1.5 17.61 3.85 18.68 6.75 18.68C9.65 18.68 12 17.61 12 16.3M1.5 12.48V20.11C1.5 21.43 3.85 22.5 6.75 22.5C9.65 22.5 12 21.43 12 20.11M12 16.3C12 17.61 14.35 18.68 17.25 18.68C20.15 18.68 22.5 17.61 22.5 16.3V12.48M22.5 12.48C22.5 13.26 21.67 14 20.39 14.39M22.5 12.48C22.5 13.26 21.67 13.96 20.39 14.39M14.11 14.39C15.1243 14.7156 16.1848 14.8743 17.25 14.86C18.3152 14.8743 19.3757 14.7156 20.39 14.39M12 20.11C12 21.43 14.35 22.5 17.25 22.5C20.15 22.5 22.5 21.43 22.5 20.11V13.48M22.5 6.75C22.5 7.78835 22.1921 8.80338 21.6152 9.66674C21.0383 10.5301 20.2184 11.203 19.2591 11.6004C18.2998 11.9977 17.2442 12.1017 16.2258 11.8991C15.2074 11.6965 14.2719 11.1965 13.5377 10.4623C12.8035 9.72808 12.3035 8.79262 12.1009 7.77422C11.8983 6.75582 12.0023 5.70022 12.3996 4.74091C12.797 3.7816 13.4699 2.96166 14.3333 2.38478C15.1966 1.80791 16.2117 1.5 17.25 1.5C17.9413 1.49332 18.627 1.62455 19.267 1.88602C19.9069 2.1475 20.4884 2.53396 20.9772 3.0228C21.466 3.51164 21.8525 4.09306 22.114 4.73303C22.3754 5.37301 22.5067 6.0587 22.5 6.75Z"
                stroke="url(#paint0_linear_678_2560)"
                strokeWidth="0.9"
                strokeMiterlimit="10"
                strokeLinecap="square"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_678_2560"
                  x1="1.5"
                  y1="11.9999"
                  x2="22.5002"
                  y2="11.9999"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E5C96F" />
                  <stop offset="0.51" stop-color="#D7B45C" />
                  <stop offset="1" stop-color="#C59124" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-sm font-medium">Weekly Bonus</span>
        </div>
        <button
          disabled={isLoading}
          onClick={() => cliamRPoint()}
          className="px-3 py-1 text-xs text-black bg-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Claim
        </button>
      </div>

      {/* Menu Item: Monthly Bonus */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full ">
            {/* Icon */}
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5417 8.89177C15.6085 7.69706 14.5513 6.69033 13.4847 5.9805C13.0999 5.72442 12.7188 5.50922 12.3423 5.33428C12.724 4.99387 13.0965 4.56722 13.4586 4.05455C14.1888 3.02067 14.6147 1.99664 14.6325 1.95352C14.787 1.57894 14.6287 1.14844 14.2684 0.963141C13.9081 0.777844 13.4658 0.899531 13.251 1.24322C12.9247 1.76531 12.4705 1.89633 12.147 1.91433C11.5871 1.94541 11.0183 1.66819 10.6259 1.17258C10.036 0.427406 9.10301 0 8.06623 0C7.02945 0 6.09645 0.427406 5.50653 1.17248C5.33131 1.39378 5.28945 1.69256 5.39717 1.95347C5.41494 1.99655 5.84084 3.02058 6.57106 4.0545C6.93294 4.56684 7.30522 4.99331 7.68669 5.33367C7.30714 5.50983 6.92291 5.72672 6.53497 5.98519C5.46519 6.69778 4.40506 7.70845 3.46906 8.90794C1.49253 11.4409 0.3125 14.4618 0.3125 16.9887C0.3125 19.0676 1.05252 20.7332 2.5122 21.9395C4.16778 23.3067 6.69195 24 10.0147 24C13.3256 24 15.8421 23.3011 17.4944 21.9227C18.9507 20.7078 19.6891 19.0319 19.6891 16.9415C19.6891 14.4242 18.5125 11.415 16.5417 8.89177ZM7.06123 1.84059C7.33864 1.66022 7.69086 1.55888 8.06623 1.55888C8.61556 1.55888 9.11558 1.77619 9.40367 2.14012C10.0466 2.95219 10.9804 3.4372 11.9461 3.4733C11.388 4.18369 10.7089 4.77403 10.0148 4.77403C8.78848 4.77403 7.60878 2.93095 7.06123 1.84059ZM16.4958 20.7257C15.1312 21.8639 12.9507 22.4411 10.0147 22.4411C7.06386 22.4411 4.87367 21.8679 3.50497 20.7376C2.42094 19.8418 1.87128 18.5805 1.87128 16.9887C1.87128 14.7975 2.92798 12.1352 4.69798 9.86686C6.39884 7.68703 8.43612 6.33286 10.0147 6.33286C11.5877 6.33286 13.618 7.68108 15.3132 9.85139C17.0771 12.1097 18.1302 14.7602 18.1302 16.9415C18.1302 18.5477 17.5803 19.821 16.4958 20.7257Z"
                fill="white"
              />
              <path
                d="M16.5417 8.89177C15.6085 7.69706 14.5513 6.69033 13.4847 5.9805C13.0999 5.72442 12.7188 5.50922 12.3423 5.33428C12.724 4.99387 13.0965 4.56722 13.4586 4.05455C14.1888 3.02067 14.6147 1.99664 14.6325 1.95352C14.787 1.57894 14.6287 1.14844 14.2684 0.963141C13.9081 0.777844 13.4658 0.899531 13.251 1.24322C12.9247 1.76531 12.4705 1.89633 12.147 1.91433C11.5871 1.94541 11.0183 1.66819 10.6259 1.17258C10.036 0.427406 9.10301 0 8.06623 0C7.02945 0 6.09645 0.427406 5.50653 1.17248C5.33131 1.39378 5.28945 1.69256 5.39717 1.95347C5.41494 1.99655 5.84084 3.02058 6.57106 4.0545C6.93294 4.56684 7.30522 4.99331 7.68669 5.33367C7.30714 5.50983 6.92291 5.72672 6.53497 5.98519C5.46519 6.69778 4.40506 7.70845 3.46906 8.90794C1.49253 11.4409 0.3125 14.4618 0.3125 16.9887C0.3125 19.0676 1.05252 20.7332 2.5122 21.9395C4.16778 23.3067 6.69195 24 10.0147 24C13.3256 24 15.8421 23.3011 17.4944 21.9227C18.9507 20.7078 19.6891 19.0319 19.6891 16.9415C19.6891 14.4242 18.5125 11.415 16.5417 8.89177ZM7.06123 1.84059C7.33864 1.66022 7.69086 1.55888 8.06623 1.55888C8.61556 1.55888 9.11558 1.77619 9.40367 2.14012C10.0466 2.95219 10.9804 3.4372 11.9461 3.4733C11.388 4.18369 10.7089 4.77403 10.0148 4.77403C8.78848 4.77403 7.60878 2.93095 7.06123 1.84059ZM16.4958 20.7257C15.1312 21.8639 12.9507 22.4411 10.0147 22.4411C7.06386 22.4411 4.87367 21.8679 3.50497 20.7376C2.42094 19.8418 1.87128 18.5805 1.87128 16.9887C1.87128 14.7975 2.92798 12.1352 4.69798 9.86686C6.39884 7.68703 8.43612 6.33286 10.0147 6.33286C11.5877 6.33286 13.618 7.68108 15.3132 9.85139C17.0771 12.1097 18.1302 14.7602 18.1302 16.9415C18.1302 18.5477 17.5803 19.821 16.4958 20.7257Z"
                fill="url(#paint0_linear_678_2570)"
              />
              <path
                d="M10.3886 14.1851C9.57093 13.7528 8.72531 13.3058 8.72531 12.7957C8.72531 12.0794 9.30801 11.4966 10.0244 11.4966C10.7406 11.4966 11.3234 12.0794 11.3234 12.7957C11.3234 13.2261 11.6724 13.5751 12.1028 13.5751C12.5333 13.5751 12.8823 13.2261 12.8823 12.7957C12.8823 11.49 12.0019 10.3869 10.8038 10.0467V9.67795C10.8038 9.2475 10.4548 8.89852 10.0244 8.89852C9.5939 8.89852 9.24492 9.2475 9.24492 9.67795V10.0467C8.04684 10.3869 7.16643 11.49 7.16643 12.7957C7.16643 14.2451 8.5491 14.976 9.66009 15.5632C10.4778 15.9955 11.3234 16.4424 11.3234 16.9526C11.3234 17.6689 10.7406 18.2517 10.0244 18.2517C9.30805 18.2517 8.72531 17.6689 8.72531 16.9526C8.72531 16.5222 8.37632 16.1732 7.94587 16.1732C7.51541 16.1732 7.16643 16.5222 7.16643 16.9526C7.16643 18.2583 8.04684 19.3614 9.24492 19.7016V20.0703C9.24492 20.5008 9.5939 20.8498 10.0244 20.8498C10.4548 20.8498 10.8038 20.5008 10.8038 20.0703V19.7016C12.0019 19.3614 12.8823 18.2582 12.8823 16.9526C12.8823 15.5032 11.4996 14.7724 10.3886 14.1851Z"
                fill="white"
              />
              <path
                d="M10.3886 14.1851C9.57093 13.7528 8.72531 13.3058 8.72531 12.7957C8.72531 12.0794 9.30801 11.4966 10.0244 11.4966C10.7406 11.4966 11.3234 12.0794 11.3234 12.7957C11.3234 13.2261 11.6724 13.5751 12.1028 13.5751C12.5333 13.5751 12.8823 13.2261 12.8823 12.7957C12.8823 11.49 12.0019 10.3869 10.8038 10.0467V9.67795C10.8038 9.2475 10.4548 8.89852 10.0244 8.89852C9.5939 8.89852 9.24492 9.2475 9.24492 9.67795V10.0467C8.04684 10.3869 7.16643 11.49 7.16643 12.7957C7.16643 14.2451 8.5491 14.976 9.66009 15.5632C10.4778 15.9955 11.3234 16.4424 11.3234 16.9526C11.3234 17.6689 10.7406 18.2517 10.0244 18.2517C9.30805 18.2517 8.72531 17.6689 8.72531 16.9526C8.72531 16.5222 8.37632 16.1732 7.94587 16.1732C7.51541 16.1732 7.16643 16.5222 7.16643 16.9526C7.16643 18.2583 8.04684 19.3614 9.24492 19.7016V20.0703C9.24492 20.5008 9.5939 20.8498 10.0244 20.8498C10.4548 20.8498 10.8038 20.5008 10.8038 20.0703V19.7016C12.0019 19.3614 12.8823 18.2582 12.8823 16.9526C12.8823 15.5032 11.4996 14.7724 10.3886 14.1851Z"
                fill="url(#paint1_linear_678_2570)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_678_2570"
                  x1="0.3125"
                  y1="12"
                  x2="19.6891"
                  y2="12"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E5C96F" />
                  <stop offset="0.51" stop-color="#D7B45C" />
                  <stop offset="1" stop-color="#C59124" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_678_2570"
                  x1="0.3125"
                  y1="12"
                  x2="19.6891"
                  y2="12"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E5C96F" />
                  <stop offset="0.51" stop-color="#D7B45C" />
                  <stop offset="1" stop-color="#C59124" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-sm font-medium">Monthly Bonus</span>
        </div>
        <button
          disabled={isLoading}
          onClick={() => cliamRPoint()}
          className="px-3 py-1 text-xs text-black bg-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Claim
        </button>
        {/* <span className="px-2 py-1 text-xs bg-gray-800 rounded-md">4d 6h</span> */}
      </div>

      {/* Explore Rewards Button */}
      <div className="px-4 py-3">
        <button
          onClick={() => handleNavigate()}
          className="w-full py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Explore Rewards
        </button>
      </div>
    </div>
  );
}
