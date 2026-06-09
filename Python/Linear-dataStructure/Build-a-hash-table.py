class HashTable:
    def __init__(self, collection=None):
        self.collection: dict = {}

    def hash(self, string):
        return sum(ord(char) for char in string)
        
    def add(self, key, value):
        #calculate hash
        dict_hash = self.hash(key)
        #check if present
        if dict_hash in self.collection:
            # add key-value
            self.collection[dict_hash][key] = value
        else:
            # add the hash and the dictionary
            self.collection[dict_hash] = {key: value}         
        return self.collection

    def remove(self, key):
        key_hash = self.hash(key)
        if key_hash in self.collection:
            removed_item = self.collection[key_hash].pop(key)
            return removed_item

    def lookup(self, key):
        hash_key = self.hash(key)
          ##############
        # alternative using get(arg, fallback-value)
        # bucket = self.collection.get(hash_key, None)
        # if bucket == None:
        #     return None
        # return self.collection[hash_key][key]
        #############
        if hash_key in self.collection:
            if key in self.collection[hash_key]:
                return self.collection[hash_key][key]
        else:
            return None



test = HashTable({})
test1 = test.add('first', 'banana') 
print(f'test1 added dictionary {test1}')
print(f"hash = {test.hash('bread')}")
print(test.add('second', 'figs'))
print(test.add('third', 'cucumber'))
print(f'removing {test.remove('third')}')
print(f'dictionary {test.collection}')
print(f'lookup {test.lookup('second')}')
print(f'lookup {test.lookup('fifth')}')