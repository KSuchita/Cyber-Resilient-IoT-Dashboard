const reportContainer = document.getElementById("reportContainer");
const searchInput = document.getElementById("searchInput");

function createCard(report)
{
    return `
    <div class="report-card fade">

        <div class="report-content">

            <h3>${report.zone}</h3>

            <p>
                <i class="fa-solid fa-location-dot"></i>
                <strong>Zone :</strong> ${report.zone}
            </p>

            <p>
                <i class="fa-solid fa-road"></i>
                <strong>Pipeline :</strong> ${report.pipelineId}
            </p>

            <p>
                <i class="fa-solid fa-microchip"></i>
                <strong>Sensor :</strong> ${report.sensorId}
            </p>

            <div class="info-grid">

                <div class="info-box">
                    <h5>Water Loss</h5>
                    <span>${report.waterLoss} L/min</span>
                </div>

                <div class="info-box">
                    <h5>Flow Rate</h5>
                    <span>${report.flowRate} L/min</span>
                </div>

                <div class="info-box">
                    <h5>Pressure</h5>
                    <span>${report.pressure} Bar</span>
                </div>

                <div class="info-box">
                    <h5>Sensor Health</h5>
                    <span>${report.sensorHealth}</span>
                </div>

            </div>

            <div class="ai-box">

                <h4>
                    AI Leakage Detection Confidence
                </h4>

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width:${report.aiConfidence}%">

                    </div>

                </div>

                <div class="progress-text">

                    ${report.aiConfidence}% Confidence

                </div>

            </div>

            <br>

            <span class="badge ${report.severity.toLowerCase()}">

                ${report.severity}

            </span>

            <span class="status ${report.status.toLowerCase()}">

                ${report.status}

            </span>

            <br>

            <span class="cyber ${report.cyberStatus.toLowerCase()}">

                🛡 ${report.cyberStatus}

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

    if(data.length===0)
    {
        reportContainer.innerHTML=`
        <h2 class="empty">
            No Leakage Records Found
        </h2>`;
        return;
    }

    data.forEach(report=>
    {
        reportContainer.innerHTML+=createCard(report);
    });

    updateStats(data);
}

function updateStats(data)
{
    document.getElementById("totalReports").innerHTML=data.length;

    let critical=0;
    let active=0;
    let waterSaved=0;

    data.forEach(report=>
    {
        if(report.severity==="Critical")
            critical++;

        if(report.sensorHealth==="Healthy")
            active++;

        waterSaved+=report.waterLoss;
    });

    document.getElementById("criticalReports").innerHTML=critical;

    document.getElementById("activeSensors").innerHTML=active;

    document.getElementById("waterSaved").innerHTML=waterSaved;
}

searchInput.addEventListener("keyup",function()
{
    const keyword=this.value.toLowerCase();

    const filtered=reports.filter(report=>
    {
        return report.zone.toLowerCase().includes(keyword) ||

        report.sensorId.toLowerCase().includes(keyword) ||

        report.pipelineId.toLowerCase().includes(keyword);
    });

    loadReports(filtered);
});
function updateClock()
{
    const now = new Date();

    document.getElementById("lastUpdated").innerHTML =
    now.toLocaleString("en-IN");
}

setInterval(updateClock,1000);

const alerts =
[
    "AI detected abnormal pressure drop in Pipeline PL-101.",
    "IoT sensors are transmitting real-time pipeline data.",
    "Critical leakage detected in Bachupally Zone A.",
    "Water distribution network operating normally.",
    "Maintenance team dispatched to Pipeline PL-104.",
    "AI model predicts 98% probability of underground leakage.",
    "Cyber security scan completed successfully.",
    "Sensor WL-003 restored communication.",
    "Pressure stabilized after valve adjustment.",
    "Real-time monitoring active across all smart zones."
];

function updateAlert()
{
    const random =
    Math.floor(Math.random()*alerts.length);

    document.getElementById("liveAlert").innerHTML =
    alerts[random];
}

setInterval(updateAlert,5000);

document.addEventListener("DOMContentLoaded",function()
{
    loadReports(reports);

    updateClock();

    updateAlert();
});