import React from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = () => {
  return (
    <div>
      <div className="upper">
        <h1 class="text-5xl font-bold pl-96 pt-10 pb-10">My learning</h1>
        <div className="flex items-center pl-96">
          <button class="text-white hover:bg-violet-950 border-b-8 border-slate-900 font-bold py-2 rounded text-lg">
            <Link to="/home/my-courses/learning">All courses</Link>
          </button>
          <button class="text-white hover:bg-violet-950 border-b-8 font-bold py-2 rounded text-lg mx-8">
            <Link to="/home/my-courses/wishlist">Wishlist</Link>
          </button>
          <button class="text-white hover:bg-violet-950 border-b-8 border-slate-900 font-bold py-2 rounded text-lg">
            <Link to="/home/my-courses/archived">Archived</Link>
          </button>
        </div>
      </div>
      <div className="lower cardContainer mx-auto flex flex-col">
        <form class="items-end lg:w-1/4 md:w-1/3 w-full ml-auto pb-8 px-2">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div class="relative flex items-center">
            <input
              type="search"
              id="default-search"
              class="block w-full p-2 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search my course..."
              required
            />
            <button
              type="submit"
              class="text-white absolute end-1 bg-violet-950 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg class="w-4 h-4 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </button>
          </div>
        </form>

        <div className="justify-center md:justify-start flex flex-wrap">
          <div class="bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2">
            <img class="" src="https://img-c.udemycdn.com/course/480x270/3490000_d298_2.jpg" alt="" />
            <div class="flex flex-col gap-1 pt-1.5">
              <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">Docker & Kubernetes: The Practical Guide [2024 Edition]</h3>
              <p class="text-xs truncate text-gray-500">Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller</p>
              <div class="flex gap-1 items-center">
                <span class="text-gray-900 font-bold text-sm">4.7</span>

                <div class="flex gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current " viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                </div>

                <span class="text-gray-500 font-medium text-xs inline-block align-middle">({(25359).toLocaleString()})</span>
              </div>
              <div class="text-gray-500 text-xs align-middle">23.5 total hours • 262 lectures</div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-gray-900 ">
                  <span class="underline">đ</span>
                  {(349000).toLocaleString()}
                </span>
                <span class="text-gray-500 line-through">
                  <span class="underline">đ</span>
                  {(2199000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2">
            <img class="" src="https://img-c.udemycdn.com/course/480x270/3490000_d298_2.jpg" alt="" />
            <div class="flex flex-col gap-1 pt-1.5">
              <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">Docker & Kubernetes: The Practical Guide [2024 Edition]</h3>
              <p class="text-xs truncate text-gray-500">Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller</p>
              <div class="flex gap-1 items-center">
                <span class="text-gray-900 font-bold text-sm">4.7</span>

                <div class="flex gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current " viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                </div>

                <span class="text-gray-500 font-medium text-xs inline-block align-middle">({(25359).toLocaleString()})</span>
              </div>
              <div class="text-gray-500 text-xs align-middle">23.5 total hours • 262 lectures</div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-gray-900 ">
                  <span class="underline">đ</span>
                  {(349000).toLocaleString()}
                </span>
                <span class="text-gray-500 line-through">
                  <span class="underline">đ</span>
                  {(2199000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2">
            <img class="" src="https://img-c.udemycdn.com/course/480x270/3490000_d298_2.jpg" alt="" />
            <div class="flex flex-col gap-1 pt-1.5">
              <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">Docker & Kubernetes: The Practical Guide [2024 Edition]</h3>
              <p class="text-xs truncate text-gray-500">Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller</p>
              <div class="flex gap-1 items-center">
                <span class="text-gray-900 font-bold text-sm">4.7</span>

                <div class="flex gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current " viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                </div>

                <span class="text-gray-500 font-medium text-xs inline-block align-middle">({(25359).toLocaleString()})</span>
              </div>
              <div class="text-gray-500 text-xs align-middle">23.5 total hours • 262 lectures</div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-gray-900 ">
                  <span class="underline">đ</span>
                  {(349000).toLocaleString()}
                </span>
                <span class="text-gray-500 line-through">
                  <span class="underline">đ</span>
                  {(2199000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2">
            <img class="" src="https://img-c.udemycdn.com/course/480x270/3490000_d298_2.jpg" alt="" />
            <div class="flex flex-col gap-1 pt-1.5">
              <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">Docker & Kubernetes: The Practical Guide [2024 Edition]</h3>
              <p class="text-xs truncate text-gray-500">Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller</p>
              <div class="flex gap-1 items-center">
                <span class="text-gray-900 font-bold text-sm">4.7</span>

                <div class="flex gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current " viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                </div>

                <span class="text-gray-500 font-medium text-xs inline-block align-middle">({(25359).toLocaleString()})</span>
              </div>
              <div class="text-gray-500 text-xs align-middle">23.5 total hours • 262 lectures</div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-gray-900 ">
                  <span class="underline">đ</span>
                  {(349000).toLocaleString()}
                </span>
                <span class="text-gray-500 line-through">
                  <span class="underline">đ</span>
                  {(2199000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div class="bg-white lg:w-1/4 md:w-1/3 w-60 pb-8 px-2">
            <img class="" src="https://img-c.udemycdn.com/course/480x270/3490000_d298_2.jpg" alt="" />
            <div class="flex flex-col gap-1 pt-1.5">
              <h3 class="font-bold text-gray-900 line-clamp-2 leading-tight">Docker & Kubernetes: The Practical Guide [2024 Edition]</h3>
              <p class="text-xs truncate text-gray-500">Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller</p>
              <div class="flex gap-1 items-center">
                <span class="text-gray-900 font-bold text-sm">4.7</span>

                <div class="flex gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current " viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-[#b4690e] w-3 h-auto fill-current" viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                </div>

                <span class="text-gray-500 font-medium text-xs inline-block align-middle">({(25359).toLocaleString()})</span>
              </div>
              <div class="text-gray-500 text-xs align-middle">23.5 total hours • 262 lectures</div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-gray-900 ">
                  <span class="underline">đ</span>
                  {(349000).toLocaleString()}
                </span>
                <span class="text-gray-500 line-through">
                  <span class="underline">đ</span>
                  {(2199000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
