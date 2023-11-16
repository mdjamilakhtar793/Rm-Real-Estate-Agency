/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../Layouts/ListingItem";

const Home = () => {
  const [listingOffer, setListingOffer] = useState([]);
  const [saleListing, setsaleListing] = useState([]);
  const [rentListing, setrentListing] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListing);
  useEffect(() => {
    const fetchOfferList = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setListingOffer(data);
        fetchRents();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRents = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setrentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setsaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferList();
  }, []);
  return (
    <div>
      {/* Top */}
      <div className=" flex flex-col gap-5 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-800 text-3xl font-bold lg:text-4xl">
          Find your next <span className="text-blue-400 italic">Prefect</span>{" "}
          place with Ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          Mubassira Estate is to the best place to find your next perfect place
          to live.
          <br />
          we have a wide range of properties for you to choose from.
        </div>
        <Link
          to="/search"
          className="text-sm sm:text-sm text-blue-700 font-bold hover:underline"
        >
          Let,s get Now....
        </Link>
      </div>
      {/* Swipper */}
      <Swiper navigation>
        {listingOffer &&
          listingOffer.length > 0 &&
          listingOffer.map((listing) => (
            <SwiperSlide key={listing}>
              <div
                style={{
                  background: `url(${listing.imageUrl[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Properties Results */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {listingOffer && listingOffer.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-center text-green-800">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more Offers
              </Link>
            </div>
            <div className=" flex flex-wrap gap-5">
              {listingOffer.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-center text-green-800">
                Recent Places For Rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?rent=true"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className=" flex flex-wrap gap-5">
              {rentListing.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {listingOffer && listingOffer.length > 0 && (
          <div className="">
            <div className="">
              <h2 className="text-2xl font-semibold text-center text-green-800">
                Recent Places For Sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more place fro sale
              </Link>
            </div>
            <div className=" flex flex-wrap gap-5">
              {listingOffer.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
