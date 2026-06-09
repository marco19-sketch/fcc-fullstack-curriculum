# Define a LinkedList class that will manage the linked list structure
class LinkedList:
    # Define a nested Node class to represent individual elements in the list
    class Node:
        # Constructor for the Node class
        def __init__(self, element):
            # Store the actual data/value in this node
            self.element = element
            # Initialize the next reference to None (end of list)
            self.next = None
            
    # Constructor for the LinkedList class
    def __init__(self):
        # Initialize the length of the list to 0 (empty list)
        self.length = 0
        # Initialize the head reference to None (no nodes yet)
        self.head = None

    # Method to check if the list is empty
    def is_empty(self):
        # Return True if length is 0, False otherwise
        return self.length == 0
    
    # Method to add an element to the end of the list
    def add(self, element):
        # Create a new Node object containing the element
        node = self.Node(element)
        
        # Check if the list is currently empty
        if self.is_empty():
            # If empty, set the new node as the head of the list
            self.head = node
        else:
            # List is not empty, so we need to find the end
            # Start at the head of the list
            current_node = self.head
            
            # Traverse the list until we find the last node
            # Last node has next = None
            while current_node.next is not None:
                # Move to the next node in the list
                current_node = current_node.next
                
            # Found the last node, so set its next reference to the new node
            current_node.next = node
        
        # Increment the length counter since we added a node
        self.length += 1

    # Method to remove an element from the list
    def remove(self, element):
        # Keep track of the previous node (starts as None for head)
        previous_node = None
        # Start searching from the head of the list
        current_node = self.head
        
        # Traverse the list to find the node containing the element
        # Continue while we haven't reached the end AND haven't found the element
        while current_node is not None and current_node.element != element:
            # Move previous node to current position
            previous_node = current_node
            # Move current node to next position
            current_node = current_node.next
        
        # After the loop, check if we reached the end without finding the element
        if current_node is None:
            # Element not found in the list, so return without doing anything
            return        
        # Check if we found the element and it's not the head node
        elif previous_node is not None:
            # Bypass the current node by linking previous node to next node
            previous_node.next = current_node.next
        else:
            # The element is in the head node
            # Set the head to point to the second node (or None if only one node)
            self.head = current_node.next
        
        # Decrement the length since we removed a node
        self.length -= 1


# ===== TESTING THE LINKED LIST IMPLEMENTATION =====

# Create a new empty linked list
my_list = LinkedList()

# Check if the new list is empty (should print True)
print(my_list.is_empty())

# Add element 1 to the list
my_list.add(1)
# Add element 2 to the list (goes after element 1)
my_list.add(2)

# Check if list is empty now (should print False)
print(my_list.is_empty())
# Print the current length (should print 2)
print(my_list.length)

# Remove element 1 from the list
my_list.remove(1)
# Print the updated length (should print 1)
print(my_list.length)