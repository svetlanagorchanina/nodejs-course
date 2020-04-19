import { BoardService } from './board.service';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { BoardModule } from './board.module';
import { BOARD_SERVICE_IDENTIFIER } from './board.constants';
import { safeHandler } from "../../decorators/safeHandler";
import { Board } from "./board.interface";
import { BoardModel } from './board.model';

BoardModule.init();
const router = express.Router();
const boardService: BoardService = BoardModule.get<BoardService>(BOARD_SERVICE_IDENTIFIER.BOARD_SERVICE);

router.route('/')
  .get(safeHandler.bind(null, async (req, res) => {
    const boards: Board[] = await boardService.getAll();

    res.status(HttpStatus.OK).json(boards.map(BoardModel.toResponse));
  }))
  .post(safeHandler.bind(null, async (req, res) => {
    const board: Board = await boardService.createBoard(req.body);

    res.status(HttpStatus.OK).json(BoardModel.toResponse(board));
  }));

router.route('/:id')
  .get(safeHandler.bind(null, async (req, res) => {
    const board: Board = await boardService.getBoard(req.params.id);

    res.status(HttpStatus.OK).json(BoardModel.toResponse(board));
  }))
  .put(safeHandler.bind(null, async (req, res) => {
    const board: Board = await boardService.updateBoard(req.params.id, req.body);

    res.status(HttpStatus.OK).json(BoardModel.toResponse(board));
  }))
  .delete(safeHandler.bind(null, async (req, res) => {
    await boardService.deleteBoard(req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  }));

module.exports = router;
