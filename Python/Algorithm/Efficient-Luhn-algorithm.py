def luhn_checksum(card_number):
    # clean input
    digits = ''.join(filter(str.isdigit, card_number))
    # print(f'digits: {digits}')

    # doubling even indexes and get the total
    total = 0
    for i, digit in enumerate(reversed(digits)):
        if i % 2 == 1:
            if int(digit) * 2 > 9:
                total += int(digit) * 2 - 9
            else:
                total += int(digit) * 2
        else:
            total += int(digit)
        # print(i, digit, total)

    if total % 10 == 0:
        print('VALID!')
        return True
    else:
        print('INVALID!')
        return False

# Test with the example
card = "4539 1488 0343 6467"
print(f"Card: {card}")
print(f"Valid: {luhn_checksum(card)}")  # Should be True

# More test cases
test_cards = [
    "4539 1488 0343 6467",  # Valid
    "4539 1488 0343 6468",  # Invalid (last digit changed)
    "4111 1111 1111 1111",  # Valid (Visa test)
    "5500 0000 0000 0004",  # Valid (Mastercard test)
]

for card in test_cards:
    is_valid = luhn_checksum(card)
    print(f"{card}: {'✓ VALID' if is_valid else '✗ INVALID'}")
