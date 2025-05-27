import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/users", userRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

export default app;
