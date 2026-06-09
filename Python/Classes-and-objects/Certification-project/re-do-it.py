class Category:
    def __init__(self, name):# parameters are value you have give
        self.name = name
        self.ledger = [] # instance attribute are managed by the class

    def deposit(self, amount, description=''):
        self.ledger.append({'amount': amount, 'description': description})
    
    # check if funds are sufficient first
    def withdraw(self, amount, description=''):
        if self.check_funds(amount):
            self.ledger.append({'amount': - amount, 'description': description})
            # print(self.ledger)
            return True
        else:
            return False

    
    def get_balance(self):
        # balance = 0
        # for item in self.ledger:
        #     balance += item['amount']
        balance = sum(item['amount'] for item in self.ledger) # generator expression
        # print(f'{self.name} balance: ${balance}')
        return balance

    # check if funds are sufficient first
    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f'Transfer to {category.name}')
            category.deposit(amount, f'Transfer from {self.name}')
            # print(self.ledger)
            return True
        else:
            return False
    
    def check_funds(self, amount):
        if amount > self.get_balance():
            return False
        else:
            return True
        
    # method called by print on self
    def __str__(self):
        title = f'{self.name:*^34}\n'
        item = ''
        for a in self.ledger:
            item += f"{a['description'][:25]:25}{a['amount']:>9.2f}\n"
        total = f'Total: {self.get_balance()}'
        return title + item + total
    
def create_spend_chart(categories):
    total_spent = []

    for category in categories:
        category_spend = []
        for item in category.ledger:
            if item['amount'] < 0:
                category_spend.append(item['amount'])
                # print(category_spend)
            category_total = sum(category_spend)
        total_spent.append(category_total)
    # print(total_spent)
    # return total_spent

    percentages =[]
    for item in total_spent:
        # after the percentage I use a floor division // 10 to round down and then again *10 to get a multiple of 10
        rounded_percent = (item / sum(total_spent) * 100) // 10 * 10
        percentages.append(rounded_percent)
    # print(f'percentages {percentages}')

    chart = 'Percentage spent by category\n\n'
    #  drawing the y axis
    for  i in range(100, -1, -10):
        chart += f'{i:>3}| '
        for item in percentages:
            if item >= i:
                chart += 'o  '
            else:
                chart += '   '
        chart += '\n'
    # x axis
    chart += '    ' + '---' * len(categories) + '--\n'
    
    max_length_name = max(len(category.name) for category in categories)
    
    # write category name one line per iteration
    for i in range(max_length_name):
        chart += '    '
        for category in categories:
            if i < len(category.name):
                chart += f' {category.name[i]} '
            else:
                chart += '   '
        chart += '\n'
    return chart


        

def main():
    print('\n')
    food = Category('food')
    clothing = Category('clothing')
    auto = Category('auto')
    gaming = Category('gaming')
    certifications = Category('certifications')

    food.deposit(2500, 'food deposit')
    food.deposit(10000, 'food deposit')
    clothing.deposit(100000, 'clothing deposit')
    auto.deposit(70000, 'auto deposit')
    gaming.deposit(300000, 'gaming deposit')
    certifications.deposit(30000, 'certifications deposit')
    # print('\n\n')

    result = food.withdraw(450, 'oranges')
    # print(f'withdraw: {result}')
    result2 = food.withdraw(3000, 'caviar')
    # print(f'big withdraw: {result2}')
    food.withdraw(5000, 'party in the park')
    clothing.withdraw(1500, 'shoes')
    clothing.withdraw(95000, 'snikers')
    auto.withdraw(1000, 'fuel')
    auto.withdraw(65000, 'new car')
    gaming.withdraw(3000, 'new console')
    gaming.withdraw(296500, 'car simulator')
    certifications.withdraw(1500, 'python certification')
    certifications.withdraw(25000, 'Ccna')
    # print('\n')

    food.get_balance()
    clothing.get_balance()
    auto.get_balance()
    gaming.get_balance()
    certifications.get_balance()
    # print('\n')

    food.transfer(300, clothing)
    transfer = certifications.transfer(7000, food)
    # print(f'Transfer: {transfer}')
    transfer2 = auto.transfer(1000, food)
    # print(f'Transfer auto to food: {transfer2}')
    # print('\n')

    print(f'{food}\n')
    print(f'{clothing}\n')
    print(f'{auto}\n')
    print(f'{gaming}\n')
    print(f'{certifications}\n')

    chart = create_spend_chart([food, auto, certifications, clothing, gaming])
    print(chart)

if __name__ == '__main__':
    main()
