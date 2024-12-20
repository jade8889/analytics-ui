"use client";
import Script from "next/script";

import Slider from "react-slick";

import { useState } from "react";

// import Parallax from "parallax-js";

export default function Home() {
  const settings = {
    fade: true,
    dots: true,
    infinite: true,
    autoplay: true,
    touchMove: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <>
      <div className="content__box">
        <div className="start-screen main-screen">
          <div className="wrap pb-160 mobile-pb-120">
            <div className="top-block d-flex d-flex-center">
              <div className="left-block">
                <div className="info_space ">
                  <div className="info_icon"></div>
                  <div className="space">
                    <div className="text">Fully verifiable smart contracts</div>
                  </div>
                </div>
              </div>
              <div className="right-block back-shadow ">
                {/* @ts-ignore */}
                <Slider {...settings} className="main-slider owl-carousel">
                  <div className="item ">
                    <div className="roulette-view no-back-shadow start-size-roulette">
                      <div className="scene_paralax back-scene">
                        {/* <div className="item" data-depth="0.1">
                          <div className="coin bg1"></div>
                        </div>
                        <div className="item" data-depth="0.2">
                          <div className="coin bg2"></div>
                        </div>
                        <div className="item" data-depth="-0.09">
                          <div className="coin bg3"></div>
                        </div>
                        <div className="item" data-depth="0.04">
                          <div className="coin bg4"></div>
                        </div> */}
                      </div>

                      {/* <div className="scene_paralax front-scene">
                        <div className="item" data-depth="0.12">
                          <div className="coin bg5"></div>
                        </div>
                        <div className="item" data-depth="0.2">
                          <div className="coin bg6"></div>
                        </div>
                        <div className="item" data-depth="-0.14">
                          <div className="coin bg7"></div>
                        </div>
                        <div className="item" data-depth="-0.13">
                          <div className="coin bg8"></div>
                        </div>
                        <div className="item" data-depth="0.18">
                          <div className="coin bg9"></div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="item start-slide-land">
                    <div className="game-view">
                      <div className="sphere-paralax back-sphere">
                        <div className="item" data-depth="0.1">
                          <div className="sphere bg1"></div>
                        </div>
                        <div className="item" data-depth="0.2">
                          <div className="sphere bg4"></div>
                        </div>
                      </div>
                      <div className="bg"></div>
                      <div className="sphere-paralax top-sphere">
                        <div className="item" data-depth="0.08">
                          <div className="sphere bg3"></div>
                        </div>
                        <div className="item" data-depth="0.3">
                          <div className="sphere bg2"></div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="bg-black block-content mt-m-60 pt-120 mobile-pt-80 pb-120 mobile-pb-80 bg-radius"
          id="jade-token"
        >
          <div className="wrap">
             ? (
              <>
                <h2>JADEROLL 生态系统</h2>
                <div className="text-xl text-[#acacac] text-center">
                  Jaderoll 旨在超越一个古老的640亿美元行业。
                </div>
                <div className="text-xl text-[#acacac] text-center mb-12">
                  一个安全、无需信任、无需KYC的全球游戏中心。
                </div>
                <div className="flex w-1/2 m-auto mb-12 justify-evenly">
                  <a
                    className="px-12 py-4 transition duration-300 border border-white border-solid rounded-2xl hover:bg-white hover:text-black"
                    target="_blank"
                    href="https://docs.jaderoll.xyz/overview/roadmap"
                  >
                    路线图
                  </a>
                  <a
                    className="px-12 py-4 transition duration-300 border border-white border-solid rounded-2xl hover:bg-white hover:text-black"
                    target="_blank"
                    href="https://docs.jade.gl/overview/how-it-works "
                  >
                    运作方式
                  </a>
                </div>
                <div className="start-info d-flex d-flex-center">
                  <div className="white-space">
                    <div className="title">
                      JADEROLL 生态系统通过{" "}
                      <span>
                        <a
                          target="_blank"
                          href="https://docs.jade.gl/token/usdjade"
                          className="text-green-800 underline"
                        >
                          $JADE
                        </a>
                      </span>{" "}
                      拥有和驱动
                    </div>
                    <div className="description">
                      {
                        "一种通缩代币，用户可以通过它与 Jaderoll 的生态系统进行互动。"
                      }
                      <br />
                      <br />
                      每个区块中，持有者和流动性提供者的总供应量都会减少，使代币稀缺且具有通缩性。
                      <br />
                      <br />
                      持有者可以质押他们的代币以防止贬值并获得多重奖励，或者在我们独特的正期望值游戏中下注以获得更高的回报。
                    </div>
                    <div className="green-text">
                      质押并在我们101% RTP的游戏中玩耍。
                    </div>
                    <div className="buttons d-flex d-flex-center mobile-d-block">
                      <a
                        target="_blank"
                        href="https://aerodrome.finance/swap?from=eth&to=0x628c5ba9b775dacecd14e237130c537f497d1cc7"
                        className="btn btn-green"
                      >
                        获取 $JADE
                      </a>
                      <a href="staking" className="btn btn-border-green">
                        质押
                      </a>
                    </div>
                  </div>
                  <div className="image"></div>
                </div>
              </>
            ) : (
              <>
                <h2>JADEROLL ECOSYSTEM</h2>
                <div className="text-xl text-[#acacac] text-center">
                  Jaderoll aims to overtake an old-fashioned $64 Billion Dollar
                  industry.
                </div>
                <div className="text-xl text-[#acacac] text-center mb-12">
                  A secure, trustless, no-kyc worldwide gaming hub.
                </div>
                <div className="flex w-full gap-2 m-auto mb-12 md:w-1/2 justify-evenly">
                  <a
                    className="px-12 py-4 transition duration-300 border border-white border-solid rounded-2xl hover:bg-white hover:text-black"
                    target="_blank"
                    href="https://docs.jaderoll.xyz/overview/roadmap"
                  >
                    ROADMAP
                  </a>
                  <a
                    className="px-12 py-4 transition duration-300 border border-white border-solid rounded-2xl hover:bg-white hover:text-black"
                    target="_blank"
                    href="https://docs.jade.gl/overview/how-it-works "
                  >
                    HOW IT WORKS
                  </a>
                </div>
                <div className="start-info d-flex d-flex-center">
                  <div className="white-space">
                    <div className="title">
                      Jaderoll ecosystem is owned and fueled through{" "}
                      <span>
                        <a
                          target="_blank"
                          href="https://docs.jade.gl/token/usdjade"
                          className="text-green-800 underline"
                        >
                          $JADE
                        </a>
                      </span>
                    </div>
                    <div className="description">
                      {`A deflationary token through which users can interact with
                    Jaderoll's ecosystem.`}
                      <br />
                      <br />
                      Entire supply across holders and LPs debases each block
                      making the token scarce and deflationary.
                      <br />
                      <br />
                      Jaders can stake their tokens to protect from debasement
                      and receive multiple rewards, or bet in our unique +EV
                      games for bigger payouts.
                    </div>
                    <div className="green-text">
                      STAKE AND PLAY ON OUR 101% RTP GAMES.
                    </div>
                    <div className="buttons d-flex d-flex-center mobile-d-block">
                      <a
                        target="_blank"
                        href="https://aerodrome.finance/swap?from=eth&to=0x628c5ba9b775dacecd14e237130c537f497d1cc7"
                        className="btn btn-green"
                      >
                        Get $JADE
                      </a>
                      <a href="staking" className="btn btn-border-green">
                        Stake
                      </a>
                    </div>
                  </div>
                  <div className="image"></div>
                </div>
              </>
            )}
          </div>
        </div> */}
      </div>
      <Script
        src="/parallax.min.js"
        onReady={() => {
          const sceneMain = document.querySelector(".scene_paralax.back-scene");
          const sceneMain2 = document.querySelector(
            ".scene_paralax.front-scene"
          );
          const sceneMain3 = document.querySelector(".back-sphere");
          const sceneMain4 = document.querySelector(".top-sphere");

          if (sceneMain) {
            // @ts-ignore
            new Parallax(sceneMain, { relativeInput: true });
          }
          if (sceneMain2) {
            // @ts-ignore
            new Parallax(sceneMain2, { relativeInput: true });
          }
          if (sceneMain3) {
            // @ts-ignore
            new Parallax(sceneMain3, { relativeInput: true });
          }
          if (sceneMain4) {
            // @ts-ignore
            new Parallax(sceneMain4, { relativeInput: true });
          }
        }}
      />
    </>
  );
}
