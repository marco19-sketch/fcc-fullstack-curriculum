import re # regex

def verify_card_number(digits):
    '''Time complexity O(n), Space complexity O(1)'''
    #clean the input
    clean_digits = re.sub(r'-|\s', '', digits)
    
    #creating a reversed list of numbers
    array = list(clean_digits)
    print(f' array: {array}')
    array.reverse()
    print(f'reversed: {array}')

    number_array = []
    for digit in array:
        number_array.append(int(digit))
    print(f'number_array: {number_array}')

    #doubling even indexes 
    updated_array = []
    for i, num in enumerate(number_array):
        if i % 2 != 0:
            num *= 2
            if num > 9:
                num -= 9
        else:
            num
        updated_array.append(num)
    print(f'updated array: {updated_array}')

    if sum(updated_array) % 10 == 0:
        print('VALID!')
        return 'VALID!'
    else:
        print('INVALID!')
        return 'INVALID!'

verify_card_number('1234 5678 9012 3456')
