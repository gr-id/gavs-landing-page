import pandas as pd
import json

def extract_data():
    file_path = '1b Validate Bank List (Updated 2026 01).xlsx'
    
    # Read the first sheet (Guide)
    df = pd.read_excel(file_path, sheet_name=0)
    
    # Let's drop row 0 and row 1 just to see the structure
    df = df.iloc[2:].dropna(subset=['Unnamed: 1', 'Unnamed: 2'])
    
    # We rename columns for clarity:
    # Unnamed: 1 -> Country Code
    # Unnamed: 2 -> Country Name
    # Unnamed: 3 -> Number of Banks (maybe?)
    
    countries = []
    total_banks = 0
    for _, row in df.iterrows():
        code = str(row['Unnamed: 1']).strip()
        name = str(row['Unnamed: 2']).strip()
        count_val = row['Unnamed: 3']
        
        try:
            count = int(count_val)
        except:
            count = 0
            
        if code and name and code != 'nan':
            countries.append({
                'code': code.upper(),
                'name': name,
                'banks': count
            })
            total_banks += count
            
    print(f"Total countries parsed: {len(countries)}")
    print(f"Total banks covered: {total_banks}")
    print("Countries sample:")
    print(countries[:5])
    
    # Write it to a JSON file to easily use in JS later
    with open('countries_data.json', 'w', encoding='utf-8') as f:
        json.dump(countries, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    extract_data()
