// Mock shopper profile data
const SHOPPER_DATA = {
    'sample': {
        id: 'sample',
        name: 'Emma Smith Johnson',
        tags: ['Hot lead', 'Switch opportunity'],
        contact: {
            email: 'ejohnson@gmail.com',
            phone: '(617) 238-2347',
            location: '01886 (24 miles)',
            delivery: 'Requested',
            appointment: 'Monday, 6/21/25, 9:45 AM'
        },
        activity: {
            cargurusActivity: 'High activity',
            date: '12/23/25',
            activityWithYou: 'VDP view | 12/22/25',
            engagedListings: 3
        },
        payment: {
            preference: 'Financing',
            status: 'Qualified',
            downPayment: '$4,000',
            monthlyPayment: '$425.00',
            loanTerm: '60 - 72 months',
            estAPR: '10.99% - 12.99%',
            deposit: '$500 - $1,500',
            creditScore: '670 - 739 (Self reported)',
            dealSummary: '2023 RAM 1500 Sport Quad Cab 4WD'
        },
        tradein: {
            vehicle: '2023 Dodge Challenger R/T SCAT'
        },
        stats: {
            uniqueVehicles: 12,
            vdpViews: 15,
            leads: 2,
            saves: 5
        },
        topModelInterests: [
            { name: '2025 Audi Q5', match: 92 },
            { name: '2024 Tesla Model Y', match: 72 },
            { name: '2025 Volvo XC90', match: 28 }
        ],
        preferences: {
            flexibility: 'Flexible',
            budget: '$15,000-$20,000',
            features: 'Backup camera, Navigation system, Park assist',
            exteriorColor: 'Gold, Blue',
            powertrain: 'ICE',
            bodyStyle: 'Sedan',
            garageCondition: 'Used',
            maxMileage: '100,000'
        }
    }
};

// Load shopper data on page load
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const shopperId = urlParams.get('id') || 'sample';
    loadShopperData(shopperId);
});

function loadShopperData(shopperId) {
    const shopper = SHOPPER_DATA[shopperId];
    if (!shopper) {
        console.error('Shopper not found:', shopperId);
        return;
    }

    // Populate page with shopper data
    document.getElementById('shopperName').textContent = shopper.name;
    document.getElementById('email').textContent = shopper.contact.email;
    document.getElementById('phone').textContent = shopper.contact.phone;
    document.getElementById('location').textContent = shopper.contact.location;
    document.getElementById('delivery').textContent = shopper.contact.delivery;
    document.getElementById('appointment').textContent = shopper.contact.appointment;
}
