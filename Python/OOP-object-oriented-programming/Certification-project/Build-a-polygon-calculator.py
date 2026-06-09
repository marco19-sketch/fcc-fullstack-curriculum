from math import sqrt

class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height

    def height(self):
        return self._height

    def set_height(self, height):
        self._height = height
    
    def set_width(self, width):
        self._width = width
   
    def get_area(self):
        return self._height * self._width
    
    def get_perimeter(self):
        return self._height * 2 + self._width * 2

    def get_diagonal(self):
        return sqrt(self._width **2 + self._height ** 2)

    def __str__(self):
        return self._format_string()

    def _format_string(self):
        return f'{self.__class__.__name__}(width={self._width}, height={self._height})'

    def get_picture(self):
        if self._width > 50:
            return 'Too big for picture.'
        return ''.join('*' * self._width + '\n' for i in range(self._height))

    def get_amount_inside(self, shape):
        return self._width // shape._width * self._height // shape._height


class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
        self._side = side
        

    def set_width(self, side):
        self._width = side
        self._height = side

    def set_height(self, side):
        self._height = side
        self._width = side

    def set_side(self, side):
        self._width = side
        self._height = side
    
    @property
    def side(self):
        return self._width

    def _format_string(self):
        return f'Square(side={self.side})'

    


rect1 = Rectangle(8, 5)
print(rect1.get_area())
rect1.set_height(3)
print(rect1.get_perimeter())
print(rect1)
print(rect1.get_picture())
rect2 = Rectangle(2, 2)
print(f'fits {rect1.get_amount_inside(rect2)} times')
print('\n')

square1 = Square(3)
print(square1.get_area())
square1.set_side(6)
print(square1.get_diagonal())
print(square1.get_picture())
print(square1) 
square1.set_width(10)
print(square1)
square1.set_height(20)
print(square1)
