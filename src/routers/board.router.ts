import { BoardService } from '../services/board/board.service';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { safeHandler } from "../decorators/safeHandler";
import { Board } from "../models/board/board.interface";
import { InjectorService } from '../services/injector/injectorService';
import { BOARD_IDENTIFIER } from '../services/injector/injectorService.constants';

const router = express.Router();
const boardService: BoardService = InjectorService.get<BoardService>(BOARD_IDENTIFIER.BOARD_SERVICE);

router.route('/')
  .get(safeHandler.bind(null, async (req, res) => {
    const boards: Board[] = await boardService.getAll();

    res.status(HttpStatus.OK).json(boards);
  }))
  .post(safeHandler.bind(null, async (req, res) => {
    const board: Board = await boardService.createBoard(req.body);

    res.status(HttpStatus.OK).json(board);
  }));

router.route('/:id')
  .get(safeHandler.bind(null, async (req, res) => {
    const board: Board = await boardService.getBoard(req.params.id);

    res.status(HttpStatus.OK).json(board);
  }))
  .put(safeHandler.bind(null, async (req, res) => {
    const board: Board = await boardService.updateBoard(req.params.id, req.body);

    res.status(HttpStatus.OK).json(board);
  }))
  .delete(safeHandler.bind(null, async (req, res) => {
    await boardService.deleteBoard(req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  }));

module.exports = router;
