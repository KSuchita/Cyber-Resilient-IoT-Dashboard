const reportContainer = document.getElementById("reportContainer");
const searchInput = document.getElementById("searchInput");
const hoverCard = document.getElementById("hoverCard");
const hoverImage = document.getElementById("hoverImage");
const hoverLocation = document.getElementById("hoverLocation");
const hoverSeverity = document.getElementById("hoverSeverity");
const hoverDescription = document.getElementById("hoverDescription");

function loadReports(data)
{
    reportContainer.innerHTML = "";

    if(data.length === 0)
    {
        reportContainer.innerHTML = "<h2 class='empty'>No Reports Found</h2>";
        return;
    }

    data.forEach(report =>
    {
        const severityClass = report.severity.toLowerCase();

        const card = document.createElement("div");

        card.className = "report-card fade";

        card.innerHTML =
        `
        <img src="${report.image}" alt="Road Damage">

        <div class="report-content">

            <h3>${report.location}</h3>

            <p><i class="fa-solid fa-location-dot"></i> ${report.location}</p>

            <p><i class="fa-solid fa-calendar"></i> ${report.date}</p>

            <span class="badge ${severityClass}">
                ${report.severity}
            </span>

            <br>

            <a href="pages/report.html?id=${report.id}" class="view-btn">
                View Details
            </a>

        </div>
        `;

        card.addEventListener("mousemove", function(e)
        {
            hoverCard.style.display = "block";
            hoverCard.style.left = e.pageX + 20 + "px";
            hoverCard.style.top = e.pageY - 40 + "px";

            hoverImage.src = report.image;
            hoverLocation.innerHTML = report.location;
            hoverSeverity.innerHTML = "<strong>Severity:</strong> " + report.severity;
            hoverDescription.innerHTML = report.description;
        });

        card.addEventListener("mouseleave", function()
        {
            hoverCard.style.display = "none";
        });

        reportContainer.appendChild(card);
    });

    updateStats(data);
}
function updateStats(data)
{
    document.getElementById("totalReports").innerHTML = data.length;

    let critical = 0;
    let pending = 0;
    let resolved = 0;

    data.forEach(report =>
    {
        if(report.severity === "Critical")
        {
            critical++;
        }

        if(report.status === "Pending")
        {
            pending++;
        }

        if(report.status === "Resolved")
        {
            resolved++;
        }
    });

    document.getElementById("criticalReports").innerHTML = critical;
    document.getElementById("pendingReports").innerHTML = pending;
    document.getElementById("resolvedReports").innerHTML = resolved;
}

searchInput.addEventListener("keyup", function()
{
    const value = this.value.toLowerCase();

    const filtered = reports.filter(report =>
    {
        return report.location.toLowerCase().includes(value);
    });

    loadReports(filtered);
});

function updateTime()
{
    const now = new Date();

    document.getElementById("lastUpdated").innerHTML =
    now.toLocaleTimeString();
}

setInterval(updateTime,1000);

const alerts =
[
    "New road anomaly detected near Bachupally Bus Stop.",
    "Monitoring active across Bachupally streets.",
    "AI camera scanning road conditions.",
    "Critical pothole detected near Main Road.",
    "System operating normally."
];

function randomAlert()
{
    const index = Math.floor(Math.random() * alerts.length);

    document.getElementById("liveAlert").innerHTML = alerts[index];
}

setInterval(randomAlert,5000);

loadReports(reports);
updateTime();