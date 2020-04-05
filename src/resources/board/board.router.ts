import { BoardService } from './board.service';
import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { BoardModule } from './board.module';
import { BOARD_SERVICE_IDENTIFIER } from './board.constants';

const router = express.Router();
BoardModule.init();

const boardService: BoardService = BoardModule.get<BoardService>(BOARD_SERVICE_IDENTIFIER.BOARD_SERVICE);

router.get('/', async (req, res, next) => {
  try {
    const boards = await boardService.getAll();

    res.status(HttpStatus.OK).json(boards);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const board = await boardService.getBoard(req.params.id);

    res.status(HttpStatus.OK).json(board);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const board = await boardService.createBoard(req.body);

    res.status(HttpStatus.OK).json(board);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);

    res.status(HttpStatus.OK).json(board);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await boardService.deleteBoard(req.params.id);

    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;