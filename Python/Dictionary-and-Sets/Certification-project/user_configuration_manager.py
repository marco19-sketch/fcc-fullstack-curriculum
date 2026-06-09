# cSpell: disable
test_settings = {
    'volume': 'low'
}

def add_setting(dct, tpl):
    key = tpl[0].lower()
    val = tpl[1].lower()
    
    if key in dct:
        return f"Setting '{key}' already exists! Cannot add a new setting with this name."
    else:
        dct.update({key: val})
        return f"Setting '{key}' added with value '{val}' successfully!"


def update_setting(dct, tpl):
    key = tpl[0].lower() 
    val = tpl[1].lower()

    if key in dct:
        dct[key] = val
        return f"Setting '{key}' updated to '{val}' successfully!" 
    else:
        return f"Setting '{key}' does not exist! Cannot update a non-existing setting."  


def delete_setting(dct, keyt):
    key = keyt.lower()

    if key in dct:
        dct.pop(key)
        return f"Setting '{key}' deleted successfully!"
    else:
        return f"Setting not found!"


def view_settings(dct):
    if dct == {}:
        return 'No settings available.'
    else:
        string = ''
        for item in dct:
            string += (f'{item.capitalize()}: {dct[item]}\n')
        return f"Current User Settings:\n{string}"

