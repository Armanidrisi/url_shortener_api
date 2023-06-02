const express = require("express");
const Url = require("../models/Url");
const validateUrl = require("../utils/validateurl");
const shortid = require("../utils/shortid");

const router = express.Router();

/**
 * Create a short URL for the provided long URL.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The response object containing the short URL information or an error message.
 */
router.post("/short", async (req, res) => {
  try {
    const { longUrl } = req.body; // get long URL from request body

    // Check if URL exists
    if (!longUrl) {
      return res.status(400).json({
        status: false,
        message: "URL is required",
      });
    }

    // Check if URL is valid
    if (!validateUrl(longUrl)) {
      return res.status(400).json({
        status: false,
        message: "URL is invalid",
      });
    }

    // Check if URL exists in the database
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json({ status: true, message: null, url });
    }

    const linkid = shortid(6); // Generate random ID
    const shortUrl = process.env.BASE_URL + "/" + linkid; // Generate short URL from base URL

    // Create a new Url instance
    url = new Url({
      urlCode: linkid,
      longUrl,
      shortUrl,
      date: new Date(),
    });

    // Save the URL to the database
    await url.save();

    return res.json({ status: true, message: null, url });
  } catch (e) {
    // Handle any internal server errors
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});
/**
 * Retrieve the long URL from a short ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The response object containing the long URL information or an error message.
 */
router.get("/short/:id", async (req, res) => {
  try {
    const { id } = req.params; // get the short ID from the request parameters

    // Check if ID exists
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID is required",
      });
    }

    const url = await Url.findOne({ urlCode: id });

    // If the URL is found, return the long URL information
    if (url) {
      return res.json({ status: true, message: "URL fetch success", url });
    }

    // If the URL is not found, return an error message
    return res.status(404).json({ status: false, message: "URL not found" });
  } catch (e) {
    // Handle any internal server errors
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});




module.exports = router;
