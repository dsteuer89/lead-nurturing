# MA Dealers Map - Update Guide

## Quick Update Process

To add new dealers to the map, simply provide the information in this format and I can update the map for you.

### Template for New Dealers

```
Dealer Name: [Name]
Address: [Street Address]
City: [City]
State: MA
ZIP: [ZIP Code]
SPID: [Service Provider ID - if available]
Classification: [Franchise L1/L3, Independent L1/L2/L3, Metro, National, SDT]
Owner: [Owner Name]
CSM: [Customer Success Manager - if applicable]
FAM: [Field Account Manager - if applicable]
```

### Example

```
Dealer Name: Bob Pion Buick GMC
Address: 333 Memorial Drive
City: Chicopee
State: MA
ZIP: 01020
SPID: 49887
Classification: Franchise L1
Owner: Guhan Aravinthan
CSM: Nick Rudomin
FAM:
```

## Alternative: Bulk Upload Format

You can also provide dealers in CSV format or as a simple list:

```
Dealer Name, Address, City, ZIP, SPID, Classification, Owner, CSM, FAM
Example Dealer, 123 Main St, Boston, 02134, 12345, Metro, John Doe, Jane Smith,
```

## What Happens When You Add Dealers

When you provide new dealer information:
1. I'll search for full addresses if not provided
2. Geocode the addresses (get latitude/longitude)
3. Update the map HTML file
4. Update the CSV export file
5. Commit and push changes to GitHub
6. GitHub Pages will automatically rebuild (takes 1-2 minutes)

## Files That Get Updated

- `/deploy/ma-dealers-map.html` - Interactive map
- `/deploy/ma-dealers-addresses.csv` - CSV export with all dealers
- Both files are version controlled in Git

## Accessing the Map

**Live URL:**
```
https://dsteuer89.github.io/lead-nurturing/deploy/ma-dealers-map.html
```

**Local File:**
```
/Users/dsteuer/code/lead-nurturing/deploy/ma-dealers-map.html
```

## Dealer Classifications

- **Franchise L1/L3** - Franchise dealers (blue on map)
- **Independent L1/L2/L3** - Independent dealers (green on map)
- **Metro** - Metropolitan area dealers (orange on map)
- **National** - National dealer groups (red on map)
- **SDT** - Self-service dealer tools (gray on map)

## Current Status

**Total Dealers:** 23
**Mapped:** 22
**Missing Address:** 1 (Carbidz.net)

Last Updated: 2026-02-23

## Notes

- The map automatically centers to show all dealers
- Color coding by classification is consistent
- Each marker shows dealer details in popup (name, address, SPID, owner, CSM/FAM, classification)
- The map is fully responsive and works on all devices
- GitHub Pages serves the map with HTTPS and is publicly accessible
