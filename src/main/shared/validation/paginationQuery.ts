import { query } from 'express-validator';

export const paginationQuery = [
  query('page', 'Param "page" should be a number greater than 0').optional().isInt({ min: 1 }),
  query('limit', 'Param "limit" should be a number greater than 0').optional().isInt({ min: 1 }),
];
