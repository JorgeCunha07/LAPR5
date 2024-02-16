import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import axios from 'axios';
import {Constants} from "../../Constants/Constants";

const route = Router();

export default (app: Router) => {
  app.use('/prologue', route);

  route.get('/create', async (req, res) => {
    // Extract query parameters from the incoming request
    const { edificio, piso, coluna, linha } = req.query;

    // Construct the URL for the external request, including the query parameters
    const externalUrl = `http://127.0.0.1:4701/planning/create?edificio=${edificio}&piso=${piso}&coluna=${coluna}&linha=${linha}`;

    try {
      const response = await axios.get(externalUrl);
      res.json(response.data);
      console.log(response.data);  // Logs the response data to the server console
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  route.get('/path', async (req, res) => {
    // Check and assert the types of query parameters
    if (typeof req.query.inicio !== 'string' || typeof req.query.fim !== 'string') {
      return res.status(400).json({ error: 'Invalid query parameters' });
    }

    // Encode query parameters
    const inicio = encodeURIComponent(req.query.inicio);
    const fim = encodeURIComponent(req.query.fim);

    // Construct the URL for the external request
    const externalUrl = `http://127.0.0.1:4701/planning/path?inicio=${inicio}&fim=${fim}`;

    try {
      const response = await axios.get(externalUrl);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
//cel(a,a1,1,2),cel(a,a1,3,3)
