let allListings = [
  { id: 288675, type: 'studio' },
  { id: 288676, type: '3br' },
  { id: 288677, type: '2br' },
  { id: 288678, type: '1br' },
  { id: 288679, type: '1br' },
  { id: 288681, type: '1br' },
  { id: 288682, type: 'studio' },
  { id: 288683, type: '2br' },
  { id: 288684, type: '2br' },
  { id: 288685, type: '2br' },
  { id: 288686, type: '3br' },
  { id: 288687, type: '2br' },
  { id: 288688, type: '2br' },
  { id: 288689, type: '2br' },
  { id: 288690, type: 'studio' },
  { id: 288691, type: '1br' },
  { id: 288723, type: '1br' },
  { id: 288724, type: '2br' },
  { id: 288726, type: '1br' },
  { id: 288977, type: '2br' },
  { id: 305055, type: '2br' },
  { id: 305069, type: '1br' },
  { id: 305327, type: '2br' },
  { id: 306032, type: '1br' },
  { id: 306543, type: '2br' },
  { id: 307143, type: '1br' },
  { id: 309909, type: '2br' },
  { id: 323227, type: '2br' },
  { id: 323229, type: 'studio' },
  { id: 323258, type: '1br' },
  { id: 323261, type: 'studio' }
];

async function fetchListings() {
  const container = document.getElementById("listing-container");
  if (!container) {
    console.error("Container element not found!");
    return;
  }

  try {
    console.log("Fetching data from the server...");

    const response = await fetch("https://api.hostaway.com/v1/listings", {
      headers: {
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4MDA2NiIsImp0aSI6IjZkODk5MWMyZTI4MGQ0NDg3NmNhNDUyZmYxMWU5ZTcxNDFhNDJhMGIzMmViNzA3ZTQyMDFhYjY4OWQ3NDc2Yjk0NDZlZjA2NTZhY2QzMDkxIiwiaWF0IjoxNzIzOTk0NTQxLjcxOTMyNiwibmJmIjoxNzIzOTk0NTQxLjcxOTMyNywiZXhwIjoyMDM5NTI3MzQxLjcxOTMzMSwic3ViIjoiIiwic2NvcGVzIjpbImdlbmVyYWwiXSwic2VjcmV0SWQiOjM5NDM0fQ.aCE9HtgvxqTLuftdSe3I75s8DocQoBz949WG-NTot-qIzWRmruShmqkZNs8rtA_CyNNocOr_fahkXZBK3hHxQ4G6QxX9z8acQ_mJ68Wz5YKT39A6gAmu--5Ux_W6xdMpzb8J6f4SrdDJneC3RIWweT3KvZ832VIm1AmQDgHgJ7k
` // Replace with your actual API key
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Hostaway");
    }

    const data = await response.json();
    console.log("Raw Fetched Data:", data); // Log raw data

    // Check if listings is an array or an object with a nested listings array
    let allListings = [];

    // Check if data is an array
    if (Array.isArray(data)) {
      allListings = data.map((listing) => ({
        ...listing,
        type: assignTypeToListing(listing.id),
      }));
    }
    // Check if data is an object with 'data' array property
    else if (data.data && Array.isArray(data.data)) {
      allListings = data.data.map((listing) => ({
        ...listing,
        type: assignTypeToListing(listing.id),
      }));
    }
    else {
      console.error("Fetched data is not in the expected format:", data);
      container.innerHTML = "Error: Data format is incorrect.";
      return;
    }

    container.innerHTML = "";

    if (allListings.length > 0) {
      displayListings(allListings); // Display all listings initially
    } else {
      container.innerHTML = "No listings available.";
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
    container.innerHTML = "Error loading listing data.";
  }
}

// Function to assign type based on listing ID
function assignTypeToListing(id) {
  const typeMapping = {
    288675: 'studio',
    288676: '3br',
    288677: '2br',
    288678: '1br',
    288679: '1br',
    288681: '1br',
    288682: 'studio',
    288683: '2br',
    288684: '2br',
    288685: '2br',
    288686: '3br',
    288687: '2br',
    288688: '2br',
    288689: '2br',
    288690: 'studio',
    288691: '1br',
    288723: '1br',
    288724: '2br',
    288726: '1br',
    288977: '2br',
    305055: '2br',
    305069: '1br',
    305327: '2br',
    306032: '1br',
    306543: '2br',
    307143: '1br',
    309909: '2br',
    323227: '2br',
    323229: 'studio',
    323258: '1br',
    323261: 'studio'
  };
  return typeMapping[id] || 'unknown'; // Default to 'unknown' if no mapping found
}

function displayListings(listings) {
  const container = document.getElementById("listing-container");
  container.innerHTML = ""; // Clear existing listings

  listings.forEach((listing) => {
    const typeClass = listing.type;

    const listingDiv = document.createElement("div");
    listingDiv.className = `listing col-md-4 mb-4 ${typeClass}`; // Add the class dynamically

    listingDiv.innerHTML = `
      <div class="card ${typeClass}">
        <img src="${listing.imageUrl}" class="card-img-top" alt="Listing Image">
        <div class="card-body">
          <h4 class="card-title">${listing.name || "N/A"}</h4>
          <ul class="list-unstyled">
            <li><strong>Price:</strong> $${listing.price || "N/A"}</li>
          </ul>
          <a href="details.html?id=${listing.id}" class="read-more-link">Read More</a>
        </div>
      </div>
    `;

    container.appendChild(listingDiv);
    // Trigger the fade-in effect
    setTimeout(() => listingDiv.classList.add("show"), 5);
  });
}

function filterListings(type) {
  const filteredListings =
    type === "all"
      ? allListings
      : allListings.filter((listing) => listing.type === type);
  displayListings(filteredListings);
}

// Event listeners for each button
document.getElementById("all-btn").addEventListener("click", () => {
  filterListings("all");
});

document.getElementById("studio-btn").addEventListener("click", () => {
  filterListings("studio");
});

document.getElementById("1br-btn").addEventListener("click", () => {
  filterListings("1br");
});

document.getElementById("2br-btn").addEventListener("click", () => {
  filterListings("2br");
});

document.getElementById("3br-btn").addEventListener("click", () => {
  filterListings("3br");
});

fetchListings(); // Initial call to fetch listings
