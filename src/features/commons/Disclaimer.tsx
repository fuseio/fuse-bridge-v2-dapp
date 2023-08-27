import React from "react";
import right from "../../assets/right.svg";
import { motion } from "framer-motion";

const Disclaimer = () => {
  const [show, setShow] = React.useState(false);
  return (
    <motion.div className="w-full bg-white px-6 py-5 mt-7 rounded-md flex flex-col overflow-hidden">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <p className="text-lg font-semibold">Legal Disclaimer</p>
        <img
          src={right}
          alt="right"
          className={show ? "ml-auto h-2 -rotate-90" : "ml-auto h-2 rotate-90"}
        />
      </div>
      {show && (
        <div className="mt-3">
          <p>
            The products is in beta form and may therefore contain defects. a
            primary purpose of this beta release is to obtain feedback on
            software and product performance and the identification of defects.
          </p>
          <p className="mt-4">
            You are advised to use caution and not to rely in any way on the
            constant correct functioning or performance of the products and/or
            accompanying products and services relating to this beta verson.fuse
            does not give any warranties, whether express or implied as to the
            suitability or usability of this product, software, and/or its
            content in the beta version. fuse will not be liable for any loss,
            wehter direct or indirect, special or consequenntial, suffered by
            any party as a result of their use of the beta vestion, its content,
            and functionalities.
          </p>
          <p className="mt-4">
            Should you encounter any bugs, glitches, lack of functionality or
            other problems on the beta website, please email us on: &nbsp;
            <a href="mailto:hello@fuse.io" className="underline text-lightBlue">
              hello@fuse.io
            </a>
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Disclaimer;
