const reportContainer = document.getElementById("reportContainer");
const searchInput = document.getElementById("searchInput");

const hoverCard = document.getElementById("hoverCard");
const hoverImage = document.getElementById("hoverImage");
const hoverLocation = document.getElementById("hoverLocation");
const hoverSeverity = document.getElementById("hoverSeverity");
const hoverStatus = document.getElementById("hoverStatus");
const hoverDescription = document.getElementById("hoverDescription");

function createCard(report)
{
    let imageSection = "";

    if(report.status === "Resolved")
    {
        imageSection =
        `
        <div class="compare-images">

            <img src="${report.beforeImage}" alt="Before">

            <img src="${report.afterImage}" alt="After">

        </div>

        <div class="compare-labels">

            <span>Before Repair</span>

            <span>After Repair</span>

        </div>
        `;
    }
    else
    {
        imageSection =
        `
        <img
            src="${report.image}"
            alt="Road Damage">
        `;
    }

    return `
    <div class="report-card fade">

        ${imageSection}

        <div class="report-content">

            <h3>${report.location}</h3>

            <p>

                <i class="fa-solid fa-location-dot"></i>

                ${report.location}

            </p>

            <p>

                <i class="fa-solid fa-calendar"></i>

                ${report.date}

            </p>

            <p>

                <i class="fa-solid fa-user"></i>

                ${report.officer}

            </p>

            <span class="badge ${report.severity.toLowerCase()}">

                ${report.severity}

            </span>

            <span class="status ${report.status.toLowerCase()}">

                ${report.status}

            </span>

            <br>

            <a
                href="pages/report.html?id=${report.id}"
                class="view-btn">

                View Details

            </a>

        </div>

    </div>
    `;
}

function loadReports(data)
{
    reportContainer.innerHTML = "";

    if(data.length === 0)
    {
        reportContainer.innerHTML =
        `
        <h2 class="empty">

            No Reports Found

        </h2>
        `;

        return;
    }

    data.forEach(report =>
    {
        reportContainer.innerHTML += createCard(report);
    });

    addHoverEvents(data);

    updateStats(data);
}

function addHoverEvents(data)
{
    const cards =
    document.querySelectorAll(".report-card");

    cards.forEach((card,index)=>
    {
        const report = data[index];

        card.addEventListener("mousemove",function(e)
        {
            hoverCard.style.display = "block";

            hoverCard.style.left =
            e.pageX + 20 + "px";

            hoverCard.style.top =
            e.pageY - 50 + "px";

            if(report.status === "Resolved")
            {
                hoverImage.src =
                report.afterImage;
            }
            else
            {
                hoverImage.src =
                report.image;
            }

            hoverLocation.innerHTML =
            report.location;

            hoverSeverity.innerHTML =
            "<strong>Severity :</strong> " +
            report.severity;

            hoverStatus.innerHTML =
            "<strong>Status :</strong> " +
            report.status;

            hoverDescription.innerHTML =
            report.description;
        });

        card.addEventListener("mouseleave",function()
        {
            hoverCard.style.display =
            "none";
        });

    });

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
    const keyword = this.value.toLowerCase();

    const filteredReports = reports.filter(report =>
    {
        return report.location.toLowerCase().includes(keyword);
    });

    loadReports(filteredReports);
});

function updateClock()
{
    const now = new Date();

    document.getElementById("lastUpdated").innerHTML =
    now.toLocaleTimeString("en-IN");
}

setInterval(updateClock, 1000);

const alerts =
[
    "AI detected a new pothole near Bachupally X Road.",
    "Road condition monitoring active across Bachupally.",
    "Municipal maintenance team dispatched to Bachupally Circle.",
    "Critical anomaly detected near Bachupally Bus Stop.",
    "IoT sensors transmitting live road condition data.",
    "Surface crack identified near Pragathi Nagar Road.",
    "Road inspection completed near Oakridge School.",
    "No new anomalies detected in the last 5 minutes."
];

function updateAlert()
{
    const random =
    Math.floor(Math.random() * alerts.length);

    document.getElementById("liveAlert").innerHTML =
    alerts[random];
}

setInterval(updateAlert, 5000);

document.addEventListener("DOMContentLoaded", function()
{
    loadReports(reports);
    updateClock();
    updateAlert();
});