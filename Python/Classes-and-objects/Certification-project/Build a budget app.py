class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []   

    def deposit(self, amount, description=''):
        self.ledger.append({'amount': amount, 'description': description})
        print(f'Deposit of: ${amount}')

    def withdraw(self, amount, description=''):
        if self.check_funds(amount):
            self.ledger.append({'amount': -amount, 'description': description})
            return True
        else:
            return False
        
    def get_balance(self):
        balance = 0
        for transaction in self.ledger:
            balance += transaction['amount']
        print(f'Balance is: ${balance}')
        return balance

    def transfer(self, amount, dest):
        if self.check_funds(amount):
            self.ledger.append({'amount': -amount, 'description': f'Transfer to {dest.name}'})
            dest.ledger.append({'amount': amount, 'description': f'Transfer from {self.name}'})
            print('transfer result below')
            return True    
        else:
            return False

    def check_funds(self, amount):
        print(f' amount ${amount}, balance ${self.get_balance()}')
        return amount <= self.get_balance()
        
    def __str__(self):
        title = f'{self.name:*^30}\n'
        items = ''
        for item in self.ledger:
            items += f"{item['description'][:23]:23}{item['amount']:>7.2f}\n"
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total


def create_spend_chart(categories):
    # Calculate percentage spent for each category
    spent_percentages = []
    
    # Get total withdrawals for each category
    for category in categories:
        withdrawals = sum(item['amount'] for item in category.ledger if item['amount'] < 0)
        spent_percentages.append(withdrawals)
    
    # Calculate percentages (rounded down to nearest 10)
    total_spent = sum(spent_percentages)
    print(f'TOTAL SPENT {total_spent}')
    percentages = [(spent / total_spent * 100) // 10 * 10 for spent in spent_percentages]
    print(f'PERCENTAGES {percentages}')

    # Build the chart
    chart = "Percentage spent by category\n"
    
    # Vertical axis (100 down to 0)
    for i in range(100, -1, -10):
        chart += f"{i:3}| "
        for percentage in percentages:
            if percentage >= i:
                chart += "o  "
            else:
                chart += "   "
        chart += "\n"
    
    # Horizontal line
    chart += "     " + "-" * (len(categories) * 3 + 1) + "\n"
    
    # Category names vertically
    max_name_length = max(len(category.name) for category in categories)
    
    for i in range(max_name_length):
        chart += "    " # margin left
        for category in categories:
            if i < len(category.name):
                chart += f"{category.name[i]}  "
            else:
                chart += "   "
        if i < max_name_length - 1: # stops at the max length
            chart += "\n"
    
    return chart


def main():
    food = Category('food')
    clothing = Category('clothing')
    auto = Category('auto')

    food.deposit(900, 'food deposit')
    food.deposit(500, 'food deposit')
    clothing.deposit(1500, 'clothing deposit')
    auto.deposit(20000, 'deposit')

    food.get_balance()

    food.withdraw(500, 'withdraw')
    food.withdraw(400, 'cake')
    clothing.withdraw(500, 'hat')
    auto.withdraw(19000, 'new car')

    food.transfer(50, clothing)

    print(food) 
    print(auto)
    print(clothing)

    print(create_spend_chart([food, clothing, auto]))

if __name__ == '__main__':
    main()