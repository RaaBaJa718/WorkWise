const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI4ZDA1MzQ0MDMwZTRkMzU0OTFkMTYiLCJlbWFpbCI6InJ1YmVuQGVtYWlsLmNvbSIsImlhdCI6MTc0NzY2ODg5NiwiZXhwIjoxNzQ3Njc2MDk2fQ.rtTIayyU0YHEbyA30YE0iHif-CyBel0KOFihR3TQ2BHERE";
console.log("🔎 Decoded Token Data:", jwt.decode(token));