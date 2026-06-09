from abc import ABC, abstractmethod
import random

class Player(ABC):
    def __init__(self):
        self.moves = []
        self.position = (0, 0)
        self.path = [self.position]

    def make_move(self):
        x1, y1 = random.choice(self.moves)
        x0, y0 = self.position
        self.position = (x0 + x1, y0 + y1)
        self.path.append(self.position)
        return self.position
        
    @abstractmethod
    def level_up(self):
        pass

class Pawn(Player):
    def __init__(self):
        super().__init__()
        self.moves = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    def level_up(self):
        self.moves += [(1, 1), (-1, 1), (1, -1), (-1, -1)] # or also self.moves.extend([(),..])

pawn = Pawn()
print(pawn.moves)
print(pawn.level_up())
print(pawn.moves)

