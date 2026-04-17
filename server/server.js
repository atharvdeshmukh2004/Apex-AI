// /**
//  * Career Guidance System — Express Server
//  * Stack: Node.js + Express + PostgreSQL + MongoDB + Python sklearn ML
//  */

// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");

// const { connectPostgres } = require("./models/postgres");
// const { connectMongo } = require("./models/mongo");
// const { initModel } = require("./ml/randomForest"); // ← starts Flask on boot

// const authRoutes = require("./routes/auth");
// const studentRoutes = require("./routes/students");
// const matchRoutes = require("./routes/match");
// const roadmapRoutes = require("./routes/roadmap");
// const chatRoutes = require("./routes/chat");
// const adminRoutes = require("./routes/admin");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ── Middleware ─────────────────────────────────────────────────────────────────
// app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
// app.use(express.json({ limit: "10mb" }));
// app.use(morgan("dev"));

// // ── Routes ─────────────────────────────────────────────────────────────────────
// app.use("/api/auth", authRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/match", matchRoutes);
// app.use("/api/roadmap", roadmapRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/admin", adminRoutes);

// app.get("/api/health", (_req, res) =>
//   res.json({ status: "ok", time: new Date() }),
// );

// // ML service health passthrough
// app.get("/api/ml/health", async (_req, res) => {
//   const http = require("http");
//   const ML_PORT = process.env.ML_PORT || 5001;
//   http
//     .get(`http://localhost:${ML_PORT}/health`, (r) => {
//       let d = "";
//       r.on("data", (c) => {
//         d += c;
//       });
//       r.on("end", () => res.json(JSON.parse(d)));
//     })
//     .on("error", () =>
//       res.status(503).json({ status: "ML service unavailable" }),
//     );
// });

// // ── Error handler ──────────────────────────────────────────────────────────────
// app.use((err, _req, res, _next) => {
//   console.error(err.stack);
//   res
//     .status(err.status || 500)
//     .json({ error: err.message || "Internal Server Error" });
// });

// // ── Boot ───────────────────────────────────────────────────────────────────────
// async function start() {
//   // DB connections
//   await connectPostgres();
//   await connectMongo();

//   // Start ML service (non-blocking — server accepts requests while Flask warms up)
//   initModel().catch((e) => console.error("[ML] init failed:", e.message));

//   app.listen(PORT, () =>
//     console.log(`🚀 Server running on http://localhost:${PORT}`),
//   );
// }

// start();
