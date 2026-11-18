// AZ-104: Microsoft Azure Administrator. Course content, in English because the exam is taken in English.
// Structure follows the official study guide on Microsoft Learn (five skill domains).
// No LaTeX in this course: the page skips formula rendering when math is false, so a dollar sign is just a dollar sign.
(function () {
const R = String.raw;

const LESSONS = [];

window.AZ104 = {
  lang: "en",
  math: false,
  nombre: "AZ-104 Azure Administrator",
  inicio: "az-inicio",
  tutor: "You are a tutor preparing a telecommunications engineer for Microsoft exam AZ-104 (Azure Administrator). The student knows networking, IP addressing and Linux basics well, and is new to Azure. Answer in clear, plain English, because the exam is in English and English is not the student's first language. Be precise about service names, SKUs, limits and which tool or blade does what. When something has been renamed or retired (for example Azure AD is now Microsoft Entra ID), say so. If you are not sure a detail is current, say that and point to Microsoft Learn. Use networking analogies when they help. Short paragraphs, no Markdown headings or bullet lists.",
  tutorPh: "For example: when do I need a private endpoint instead of a service endpoint?",
  home: {
    eyebrow: "Exam AZ-104 · Microsoft Certified: Azure Administrator Associate",
    titulo: "From zero to Azure Administrator",
    sub: "Every lesson follows the same path: the idea in plain words, what the exam expects you to know, a hands-on lab in a real subscription, exam-style questions that are checked on the spot, and a cheat sheet for the last week.",
    stat3: ["700 / 1000", "to pass, in 100 minutes"],
    extra: R`<div class="card" style="margin:18px 0"><h3 style="margin-top:0">How this course was built</h3><p style="margin:0">The lesson list mirrors the official <a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104" target="_blank" rel="noopener">AZ-104 study guide</a>, bullet by bullet, and the labs follow Microsoft's own <a href="https://microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator/" target="_blank" rel="noopener">AZ-104 lab exercises</a>. The questions are original and written in the style of the exam. They are not real exam questions. Azure changes every month, so when a lesson and Microsoft Learn disagree, Microsoft Learn wins.</p></div>`
  },
  fases: [
    { n: 0, etiqueta: "Start", titulo: "Orientation", meta: "1 lesson · about 3 hours",
      resumen: "How the exam works, how Azure is organised, and the tools you will use in every lab.", proximas: [] },
    { n: 1, etiqueta: "Domain 1 · 20–25%", titulo: "Manage Azure identities and governance", meta: "3 lessons · about 14 hours",
      resumen: "Microsoft Entra users and groups, role-based access control, Azure Policy, locks, tags, subscriptions, management groups and cost control.", proximas: [] },
    { n: 2, etiqueta: "Domain 2 · 15–20%", titulo: "Implement and manage storage", meta: "3 lessons · about 12 hours",
      resumen: "Storage accounts, redundancy, access keys and SAS tokens, firewalls, Blob Storage and Azure Files.", proximas: [] },
    { n: 3, etiqueta: "Domain 3 · 20–25%", titulo: "Deploy and manage Azure compute resources", meta: "5 lessons · about 22 hours",
      resumen: "ARM templates and Bicep, virtual machines, availability and scale sets, containers and App Service.", proximas: [] },
    { n: 4, etiqueta: "Domain 4 · 15–20%", titulo: "Implement and manage virtual networking", meta: "3 lessons · about 14 hours",
      resumen: "Virtual networks, peering, routing, network security groups, Bastion, private access to PaaS, DNS and load balancing.", proximas: [] },
    { n: 5, etiqueta: "Domain 5 · 10–15%", titulo: "Monitor and maintain Azure resources", meta: "2 lessons · about 10 hours",
      resumen: "Azure Monitor metrics, logs and alerts, Network Watcher, Azure Backup and Site Recovery.", proximas: [] },
    { n: 6, etiqueta: "Finish", titulo: "Exam readiness", meta: "1 lesson · about 6 hours",
      resumen: "Exam technique and a full-length practice test across the five domains.", proximas: [] }
  ],
  lecciones: LESSONS
};

/* ───────────────────────── LESSON 1 ───────────────────────── */
LESSONS.push({
  id: "az-1", n: 1, fase: 0, codigo: "",
  titulo: "The exam, the Azure hierarchy and your tools",
  sub: "What AZ-104 tests, how every Azure resource fits into one tree, and the four ways to give Azure an order.",
  horas: "3 hours",
  contexto: "AZ-104 exam facts (100 minutes, pass mark 700 of 1000, five domains with weights, question types, Microsoft Learn available during the exam, annual free renewal). Azure hierarchy: Microsoft Entra tenant, management groups, subscriptions, resource groups, resources. Azure Resource Manager as the single control plane. Tools: Azure portal, Cloud Shell, Azure CLI, Azure PowerShell, ARM templates and Bicep. Regions, region pairs and availability zones. Free account and cost hygiene.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">You already know how a carrier network is organised: a management plane where you configure things, and a data plane where traffic actually flows. Azure is built the same way. Almost everything AZ-104 asks about is the management plane: who may configure what, where it lives, how it is deployed, and how you know it is healthy.</p>
<p>The job role behind the exam is the Azure administrator: the person who implements, manages and monitors identity, governance, storage, compute and virtual networks. It is an operations exam. It does not ask you to write applications, and it asks very little about architecture trade-offs. It asks whether you know which setting, on which resource, solves the problem in the scenario.</p>
<div class="nota"><strong>What makes this exam hard.</strong> The questions are rarely about definitions. They describe a small company, a requirement and a constraint, and offer four answers that all sound reasonable. The right one is usually decided by a single detail: a SKU that does not support a feature, a scope that is too broad, a setting that cannot be changed after creation. This course trains you to look for that detail.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. The exam in numbers</h3>
<div class="tabla"><table>
<thead><tr><th>Item</th><th>Value</th></tr></thead>
<tbody>
<tr><td>Time</td><td>100 minutes</td></tr>
<tr><td>Pass mark</td><td>700 on a scale of 1 to 1000. It is a scaled score, not 70 % of the questions</td></tr>
<tr><td>Number of questions</td><td>Not published. Candidates usually report between 40 and 60</td></tr>
<tr><td>Languages</td><td>English and nine others, Spanish among them. The English version is always updated first</td></tr>
<tr><td>Open book</td><td>You can open Microsoft Learn in a split window during the exam. The clock keeps running, so it helps for one or two lookups and no more</td></tr>
<tr><td>Validity</td><td>One year. You renew for free with a short online assessment on Microsoft Learn</td></tr>
<tr><td>Retake</td><td>24 hours after a first failed attempt</td></tr>
</tbody></table></div>

<h3>2. The five domains</h3>
<div class="tabla"><table>
<thead><tr><th>Domain</th><th>Weight</th><th>Lessons here</th></tr></thead>
<tbody>
<tr><td>Manage Azure identities and governance</td><td>20–25 %</td><td>2 to 4</td></tr>
<tr><td>Implement and manage storage</td><td>15–20 %</td><td>5 to 7</td></tr>
<tr><td>Deploy and manage Azure compute resources</td><td>20–25 %</td><td>8 to 12</td></tr>
<tr><td>Implement and manage virtual networking</td><td>15–20 %</td><td>13 to 15</td></tr>
<tr><td>Monitor and maintain Azure resources</td><td>10–15 %</td><td>16 and 17</td></tr>
</tbody></table></div>
<p>Networking will be your strongest domain from day one. Identity and governance is usually the weakest for network engineers, and it carries as much weight as compute. Do not skip it.</p>

<h3>3. Question types</h3>
<ul>
<li><strong>Single answer</strong> and <strong>multiple answer</strong>. The question tells you how many to select.</li>
<li><strong>Drag and drop</strong> and <strong>build list</strong>: put steps or commands in order.</li>
<li><strong>Hot area</strong> and <strong>drop-down</strong>: complete a command, a template or a sentence.</li>
<li><strong>Yes/No series</strong>: the same scenario repeated with a different proposed solution each time. Once you answer, you cannot go back. More than one of the solutions can be correct, or none.</li>
<li><strong>Case study</strong>: a long company description with several questions. Read the requirements first, then the questions, then look up details.</li>
</ul>

<h3>4. The Azure hierarchy</h3>
<p>Every resource in Azure sits in a tree with four levels below the identity directory. Learn it by heart, because access, policy and billing all follow it.</p>
<div class="tabla"><table>
<thead><tr><th>Level</th><th>What it is</th><th>What it is used for</th></tr></thead>
<tbody>
<tr><td><strong>Microsoft Entra tenant</strong></td><td>The directory of users, groups and applications. One per organisation in most cases</td><td>Identity. Every subscription trusts exactly one tenant</td></tr>
<tr><td><strong>Management group</strong></td><td>A container of subscriptions, up to six levels deep under the root</td><td>Applying access and policy to many subscriptions at once</td></tr>
<tr><td><strong>Subscription</strong></td><td>A billing and quota boundary</td><td>Invoices, limits, separation of environments</td></tr>
<tr><td><strong>Resource group</strong></td><td>A folder for resources that share a life cycle</td><td>Deploying, securing and deleting things together</td></tr>
<tr><td><strong>Resource</strong></td><td>A virtual machine, a storage account, a virtual network</td><td>The thing itself</td></tr>
</tbody></table></div>
<p>Settings made high in the tree are <em>inherited</em> by everything below. A role assigned on a subscription applies to all its resource groups and resources. A policy assigned to a management group applies to all its subscriptions. A scope in Azure is always one of these four: management group, subscription, resource group or resource.</p>
<p>Rules about resource groups that the exam likes:</p>
<ul>
<li>A resource belongs to exactly one resource group.</li>
<li>Resource groups cannot be nested.</li>
<li>A resource group has a location, which is only where its metadata is stored. The resources inside can be in any region.</li>
<li>Deleting a resource group deletes everything in it.</li>
</ul>

<h3>5. Azure Resource Manager</h3>
<p>Azure Resource Manager, ARM, is the single front door of the management plane. The portal, the command line, PowerShell and templates all send their requests to the same ARM API. ARM authenticates the caller with Microsoft Entra ID, checks the role assignments, checks the policies and the locks, and only then passes the request to the service.</p>
<p>The consequence is useful to remember: anything you can do in the portal you can do from a script, and a restriction applied in ARM holds no matter which tool is used.</p>

<h3>6. Four ways to give an order</h3>
<div class="tabla"><table>
<thead><tr><th>Tool</th><th>Looks like</th><th>Good for</th></tr></thead>
<tbody>
<tr><td>Azure portal</td><td>portal.azure.com</td><td>Exploring, one-off changes, reading settings</td></tr>
<tr><td>Azure CLI</td><td><code>az group create --name rg1 --location westeurope</code></td><td>Scripts on any operating system. Bash style</td></tr>
<tr><td>Azure PowerShell</td><td><code>New-AzResourceGroup -Name rg1 -Location westeurope</code></td><td>Scripts in PowerShell. Returns objects</td></tr>
<tr><td>ARM templates and Bicep</td><td>A file that declares the desired result</td><td>Repeatable deployments</td></tr>
</tbody></table></div>
<p>The exam shows commands in both CLI and PowerShell. You do not need to memorise every parameter, but you must recognise the patterns.</p>
<ul>
<li><strong>CLI:</strong> <code>az</code>, then a group, then a verb. <code>az vm create</code>, <code>az storage account list</code>, <code>az network vnet show</code>.</li>
<li><strong>PowerShell:</strong> verb, hyphen, <code>Az</code> and a noun. <code>New-AzVM</code>, <code>Get-AzStorageAccount</code>, <code>Set-AzVirtualNetwork</code>, <code>Remove-AzResourceGroup</code>.</li>
</ul>
<p><strong>Cloud Shell</strong> is a terminal inside the portal with both tools installed and already signed in. It needs a storage account with a file share to keep your files between sessions, and it times out after 20 minutes without activity.</p>

<h3>7. Regions and zones</h3>
<ul>
<li>A <strong>region</strong> is a set of datacentres in one area, such as West Europe (the Netherlands) or Spain Central (Madrid).</li>
<li>An <strong>availability zone</strong> is one or more datacentres inside a region with independent power, cooling and network. Regions that support zones have at least three.</li>
<li>A <strong>region pair</strong> is two regions in the same geography, hundreds of kilometres apart, that Microsoft updates one after the other. Geo-redundant storage replicates to the paired region. North Europe and West Europe are a pair.</li>
</ul>
<p>Not every service or virtual machine size exists in every region. When a scenario says a deployment fails only in one region, think of availability and quota.</p>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 0. Your subscription and your first resource group</h3>
<p>You need a subscription of your own. Reading is not enough for this exam. A free Azure account gives a credit for the first 30 days and a set of services that stay free for twelve months. It asks for a credit card to verify your identity and does not charge unless you upgrade.</p>
<div class="nota"><strong>Three rules that keep the bill at zero.</strong> Put every lab in its own resource group. Delete the resource group when you finish. Create a budget with an email alert on day one, which is the first task below.</div>
<h3>Part A. In the portal</h3>
<ol>
<li>Sign in at portal.azure.com. Open <strong>Subscriptions</strong> and note the subscription name and ID.</li>
<li>Open <strong>Microsoft Entra ID</strong> and note the tenant name, which ends in onmicrosoft.com.</li>
<li>Open <strong>Cost Management</strong>, then <strong>Budgets</strong>. Create a monthly budget of 10 euros with an alert at 80 % of actual cost, sent to your email.</li>
<li>Create a resource group named <code>rg-az104-lab00</code> in West Europe.</li>
</ol>
<h3>Part B. The same thing from Cloud Shell</h3>
<p>Open Cloud Shell with the icon at the top of the portal and choose Bash.</p>
<div class="tabla"><pre>az account show --output table
az group list --output table
az group create --name rg-az104-lab00b --location westeurope
az group show --name rg-az104-lab00b</pre></div>
<p>Switch Cloud Shell to PowerShell and repeat.</p>
<div class="tabla"><pre>Get-AzContext
Get-AzResourceGroup | Format-Table ResourceGroupName, Location
New-AzResourceGroup -Name rg-az104-lab00c -Location westeurope</pre></div>
<h3>Part C. Clean up</h3>
<div class="tabla"><pre>az group delete --name rg-az104-lab00b --yes --no-wait
Remove-AzResourceGroup -Name rg-az104-lab00c -Force</pre></div>
<p>Compare the two styles. In the CLI the resource type comes first and the verb last. In PowerShell the verb comes first. That pattern alone answers some exam questions.</p>`,
      notas: [{ id: "sub", label: "Your tenant name, the region you will use for labs, and the date your free credit ends" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Azure subscription created and portal opened." },
        { id: "t2", texto: "Budget with an email alert created." },
        { id: "t3", texto: "Resource group created in the portal, with the CLI and with PowerShell." },
        { id: "t4", texto: "Lab resource groups deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "The hierarchy",
        enunciado: R`<p>Contoso has one Microsoft Entra tenant, two subscriptions named Prod and Dev, and several resource groups in each.</p>`,
        partes: [
          { id: "a", pregunta: "You need to apply the same access rule to both subscriptions with a single assignment. Where do you assign it?", tipo: "opcion", respuesta: 1,
            opciones: ["On the Microsoft Entra tenant", "On a management group that contains both subscriptions", "On each resource group", "On a resource group that contains both subscriptions"],
            pistas: ["Which level of the tree sits above subscriptions and exists to group them?", "Resource groups cannot contain subscriptions."],
            solucion: R`A management group. It is the only scope above the subscription, and assignments made there are inherited by every subscription inside it. A resource group lives inside one subscription and cannot contain another.` },
          { id: "b", pregunta: "A resource group named RG1 was created in West Europe. Which statement is true?", tipo: "opcion", respuesta: 2,
            opciones: ["RG1 can only contain resources located in West Europe", "RG1 can be moved inside another resource group", "RG1 can contain resources from any region", "A virtual machine in RG1 can belong to RG2 at the same time"],
            pistas: ["What does the location of a resource group actually store?"],
            solucion: R`The location of a resource group is only where its metadata is kept. The resources can be in any region. Resource groups cannot be nested, and a resource belongs to exactly one.` },
          { id: "c", pregunta: "An administrator deletes a resource group that contains three virtual machines and a storage account. What happens?", tipo: "opcion", respuesta: 0,
            opciones: ["All the resources in it are deleted", "The deletion fails because the group is not empty", "The resources move to a default resource group", "Only the virtual machines are deleted"],
            pistas: ["A resource group defines a shared life cycle."],
            solucion: R`Deleting a resource group deletes everything inside it. This is why locks exist, and why labs use one group per exercise.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Tools",
        enunciado: R`<p>You are reviewing scripts written by a colleague.</p>`,
        partes: [
          { id: "a", pregunta: "Which command creates a resource group with Azure PowerShell?", tipo: "opcion", respuesta: 3,
            opciones: ["az group create --name RG1 --location westeurope", "Create-AzResourceGroup -Name RG1 -Location westeurope", "New-AzureRmGroup -Name RG1 -Location westeurope", "New-AzResourceGroup -Name RG1 -Location westeurope"],
            pistas: ["PowerShell cmdlets are Verb-AzNoun.", "The approved verb for creating things is New."],
            solucion: R`<code>New-AzResourceGroup</code>. The first option is the Azure CLI. PowerShell does not use the verb Create, and the AzureRm module was replaced by Az years ago.` },
          { id: "b", pregunta: "A user denied by a role assignment in the portal tries the same operation with the Azure CLI from a personal laptop. What happens?", tipo: "opcion", respuesta: 1,
            opciones: ["It succeeds, because the CLI bypasses the portal", "It is denied, because every tool goes through Azure Resource Manager", "It succeeds only for read operations", "It depends on the version of the CLI"],
            pistas: ["Which component checks permissions, and which tools talk to it?"],
            solucion: R`Every tool sends its request to Azure Resource Manager, which checks identity, roles, policies and locks. The result is the same from the portal, the CLI, PowerShell or a template.` },
          { id: "c", pregunta: "What does Cloud Shell need in order to keep your files between sessions?", tipo: "opcion", respuesta: 2,
            opciones: ["A virtual machine", "A Recovery Services vault", "A storage account with a file share", "A premium subscription"],
            pistas: ["It mounts something into your home directory."],
            solucion: R`A storage account with an Azure Files share, which is mounted as your home drive.` }
        ] },
      { id: "q3", nivel: 2, titulo: "The exam itself",
        enunciado: R`<p>Three facts about how AZ-104 is delivered.</p>`,
        partes: [
          { id: "a", pregunta: "Which TWO statements about the exam are true? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["You can open Microsoft Learn during the exam", "You pass by answering 70 % of the questions correctly", "The certification never expires", "In a Yes/No series you cannot return to a previous question"],
            pistas: ["The pass mark is a scaled score.", "Associate certifications are renewed every year."],
            solucion: R`Microsoft Learn is available, and Yes/No series questions are locked once answered. The pass mark of 700 is scaled, so it is not a simple percentage, and the certification must be renewed every twelve months.` },
          { id: "b", pregunta: "Which domains carry the highest weight?", tipo: "opcion", respuesta: 1,
            opciones: ["Storage and networking", "Identities and governance, and compute", "Monitoring and backup", "All five weigh the same"],
            pistas: ["Two domains are at 20–25 %."],
            solucion: R`Identities and governance, and compute, each weigh 20–25 %. Storage and networking weigh 15–20 % each, and monitoring 10–15 %.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>The exam:</strong> 100 minutes, 700 of 1000 to pass, five domains, Microsoft Learn available, renewed every year for free.`,
      R`<strong>The tree:</strong> tenant, management groups, subscriptions, resource groups, resources. Settings are inherited downwards.`,
      R`<strong>Resource groups:</strong> one per resource, no nesting, any region inside, delete the group and everything goes.`,
      R`<strong>Azure Resource Manager</strong> is the one control plane behind the portal, the CLI, PowerShell and templates.`,
      R`<strong>Command patterns:</strong> <code>az group verb</code> in the CLI and <code>Verb-AzNoun</code> in PowerShell.`
    ] }
  ]
});

/* ───────────────────────── LESSON 2 ───────────────────────── */
LESSONS.push({
  id: "az-2", n: 2, fase: 1, codigo: "Entra ID",
  titulo: "Microsoft Entra users and groups",
  sub: "Creating and managing identities, licences, guests and self-service password reset.",
  horas: "5 hours",
  contexto: "Microsoft Entra ID (formerly Azure Active Directory): tenants, user types (member, guest), cloud-only and synchronised identities, creating users in the portal, in bulk, with the CLI and with Microsoft Graph PowerShell. Groups: security and Microsoft 365, membership types assigned, dynamic user and dynamic device (dynamic needs Entra ID P1). Licences: Free, P1, P2, usage location, group-based licensing. External users with B2B collaboration. Self-service password reset: scope none, selected or all, authentication methods, registration, writeback. Entra roles compared with Azure roles; administrative units.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">In a mobile network, the HSS or the UDM holds the subscribers: who they are, how they prove it, and what profile they have. It does not carry a single packet. Microsoft Entra ID plays that part in Azure. It is the directory that answers one question for every request: who is this, and can they prove it?</p>
<p>Until 2023 the service was called Azure Active Directory, or Azure AD. The name changed and the product did not. You will still find the old name in blogs, in older practice tests and in some command names. The exam uses Microsoft Entra ID.</p>
<p>Do not confuse it with the Active Directory that runs on Windows Server in a company's own datacentre. That one, Active Directory Domain Services, speaks Kerberos and LDAP and organises objects in organisational units. Entra ID speaks web protocols, OAuth and OpenID Connect, and has a flat structure. The two can be synchronised, and that is all the exam expects you to know about the on-premises side.</p>
<div class="nota"><strong>Two kinds of role, one frequent trap.</strong> Entra ID has its own roles, such as User Administrator, which control the directory. Azure resources have a separate set of roles, such as Contributor, which control subscriptions and what is in them. A Global Administrator of the tenant has no access to virtual machines by default. The next lesson is about the second set.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Tenants</h3>
<p>A tenant is one instance of Entra ID, dedicated to one organisation. It gets an initial domain, <code>name.onmicrosoft.com</code>, and you can add custom domains that you prove you own with a DNS record. A subscription trusts exactly one tenant. A tenant can be trusted by many subscriptions.</p>

<h3>2. Users</h3>
<div class="tabla"><table>
<thead><tr><th>Kind</th><th>Where the account lives</th><th>Typical sign-in name</th></tr></thead>
<tbody>
<tr><td>Cloud-only member</td><td>Created in Entra ID</td><td>ana@contoso.com</td></tr>
<tr><td>Synchronised member</td><td>Created in on-premises Active Directory and copied by Microsoft Entra Connect or Cloud Sync</td><td>ana@contoso.com</td></tr>
<tr><td>Guest</td><td>In another directory or identity provider, invited through B2B collaboration</td><td>luis_fabrikam.com#EXT#@contoso.onmicrosoft.com</td></tr>
</tbody></table></div>
<p>Ways to create users, all of which appear in exam questions:</p>
<ul>
<li><strong>Portal,</strong> one at a time, or <strong>Bulk create</strong> with a CSV template that you download, fill in and upload.</li>
<li><strong>Azure CLI:</strong> <code>az ad user create --display-name "Ana" --user-principal-name ana@contoso.com --password ...</code></li>
<li><strong>Microsoft Graph PowerShell:</strong> <code>New-MgUser</code>. The older AzureAD and MSOnline modules are retired. If an answer uses <code>New-AzureADUser</code>, treat it as out of date.</li>
</ul>
<p>A deleted user stays in <strong>Deleted users</strong> for 30 days and can be restored with all its properties. After that it is gone.</p>
<p>To manage users you need an Entra role. <strong>User Administrator</strong> can create and manage users and groups and reset most passwords. <strong>Global Administrator</strong> can do everything in the tenant.</p>

<h3>3. Groups</h3>
<div class="tabla"><table>
<thead><tr><th>Group type</th><th>Used for</th><th>Members can be</th></tr></thead>
<tbody>
<tr><td>Security</td><td>Granting access to resources and assigning licences</td><td>Users, devices, service principals, other groups</td></tr>
<tr><td>Microsoft 365</td><td>Collaboration: shared mailbox, calendar, files, Teams</td><td>Users only</td></tr>
</tbody></table></div>
<div class="tabla"><table>
<thead><tr><th>Membership type</th><th>How members get in</th><th>Licence needed</th></tr></thead>
<tbody>
<tr><td>Assigned</td><td>An owner or administrator adds them by hand</td><td>None</td></tr>
<tr><td>Dynamic user</td><td>A rule on user attributes, for example <code>user.department -eq "Sales"</code></td><td>Entra ID P1 for each member</td></tr>
<tr><td>Dynamic device</td><td>A rule on device attributes. Security groups only</td><td>Entra ID P1</td></tr>
</tbody></table></div>
<p>Points the exam checks:</p>
<ul>
<li>You cannot add or remove a member by hand in a dynamic group. To change who is in it you change the rule or the attribute.</li>
<li>A dynamic group contains users or devices, never both.</li>
<li>The group type cannot be changed after creation. The membership type can.</li>
<li>Owners manage the group and its members without needing an administrator role.</li>
</ul>

<h3>4. Licences</h3>
<div class="tabla"><table>
<thead><tr><th>Edition</th><th>Adds, among other things</th></tr></thead>
<tbody>
<tr><td>Free</td><td>Users, groups, basic sign-in security, B2B guests, password change for cloud users</td></tr>
<tr><td>P1</td><td>Dynamic groups, group-based licensing, Conditional Access, self-service password reset with writeback, administrative units</td></tr>
<tr><td>P2</td><td>Everything in P1 plus ID Protection (risk-based policies) and Privileged Identity Management</td></tr>
</tbody></table></div>
<p>Two rules about assigning licences:</p>
<ul>
<li>A user needs a <strong>usage location</strong> before a licence can be assigned, because not every service is available in every country. A licence assignment that fails for one user is very often a missing usage location.</li>
<li><strong>Group-based licensing</strong> assigns licences to a group, and every member inherits them. It does not flow through nested groups: only direct members get the licence.</li>
</ul>

<h3>5. External users</h3>
<p>With B2B collaboration you invite someone from another organisation by email. They sign in with their own account, and a guest object appears in your directory. You then give that guest access like any other user, with groups and roles.</p>
<ul>
<li><strong>External collaboration settings</strong> decide who may invite guests (everyone, members, only certain admin roles, nobody) and which domains are allowed or blocked.</li>
<li>The <strong>Guest Inviter</strong> role lets a user invite guests when general invitations are turned off.</li>
<li>Guests have limited permissions in the directory by default. They cannot browse all users and groups.</li>
</ul>

<h3>6. Self-service password reset</h3>
<p>SSPR lets users reset a forgotten password without calling the help desk.</p>
<ul>
<li><strong>Scope:</strong> None, Selected or All. Selected means one security group. To pilot SSPR with one department, choose Selected and pick its group.</li>
<li><strong>Authentication methods:</strong> you choose which methods are allowed (authenticator app, email, mobile phone, security questions and others) and whether one or two are required to reset.</li>
<li><strong>Registration:</strong> you can require users to register their methods the next time they sign in, and ask them to reconfirm after a number of days.</li>
<li><strong>Administrators</strong> are always enabled for SSPR and always need two methods. Security questions are not allowed for them.</li>
<li><strong>Password writeback</strong> sends the new password to on-premises Active Directory for synchronised users. It needs Microsoft Entra Connect or Cloud Sync and P1 licences.</li>
<li><strong>Licences:</strong> the Free edition lets cloud users change a password they know, but not reset a forgotten one. Reset needs Entra ID P1 or P2, or Microsoft 365 Business Standard or Premium. Writeback needs P1, P2 or Business Premium.</li>
</ul>

<h3>7. Administrative units</h3>
<p>An administrative unit is a container of users, groups or devices inside the tenant. You assign an Entra role scoped to the unit, so that a help-desk technician in Madrid can reset passwords only for users in the Madrid unit. It needs P1 for the administrators. It is the Entra equivalent of delegating on an organisational unit.</p>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 1. Users, groups and a guest</h3>
<p>This follows the official Lab 01, Manage Microsoft Entra ID identities. It costs nothing. Dynamic groups need a P1 licence, and a new tenant can start a free P2 trial from <strong>Licenses</strong>.</p>
<h3>Part A. Users</h3>
<ol>
<li>In <strong>Microsoft Entra ID</strong>, open <strong>Users</strong> and create <code>az104-user1</code>. Set Job title to Cloud Administrator, Department to IT and Usage location to Spain.</li>
<li>Invite an external user with a personal email address of yours. Open the invitation and accept it in a private browser window.</li>
<li>Compare the two objects. Look at User type and at the user principal name of the guest.</li>
</ol>
<h3>Part B. Groups</h3>
<ol>
<li>Create a security group <code>IT Lab Administrators</code> with membership type Assigned. Add both users.</li>
<li>Start the P2 trial if you have not, and create a security group <code>IT Cloud Administrators</code> with membership type Dynamic user and the rule <code>user.jobTitle -eq "Cloud Administrator"</code>.</li>
<li>Wait a few minutes and check its members. Try to add a member by hand and read the message.</li>
</ol>
<h3>Part C. The same with the CLI</h3>
<div class="tabla"><pre>az ad user list --query "[].{name:displayName, upn:userPrincipalName, type:userType}" --output table
az ad group create --display-name "az104-cli-group" --mail-nickname az104cligroup
az ad group member add --group "az104-cli-group" --member-id USER_OBJECT_ID
az ad group member list --group "az104-cli-group" --output table</pre></div>
<h3>Part D. Self-service password reset</h3>
<ol>
<li>Open <strong>Password reset</strong>. Set it to Selected and choose <code>IT Lab Administrators</code>.</li>
<li>Under Authentication methods, require one method and allow email and mobile app code.</li>
<li>In a private window, sign in as <code>az104-user1</code> and follow the registration prompt.</li>
</ol>
<h3>Clean up</h3>
<p>Delete the users and groups you created, then look at <strong>Deleted users</strong> and note how long they stay there.</p>`,
      notas: [{ id: "lab1", label: "What surprised you: the guest's sign-in name, how long the dynamic group took to fill, the message when adding a member by hand" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Member user created with a usage location." },
        { id: "t2", texto: "Guest invited and invitation accepted." },
        { id: "t3", texto: "Assigned group and dynamic group created." },
        { id: "t4", texto: "Group managed from the CLI." },
        { id: "t5", texto: "SSPR enabled for one group and tested." },
        { id: "t6", texto: "Everything deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Groups",
        enunciado: R`<p>Your tenant has Microsoft Entra ID P1 licences for all users. The Sales department has 300 users, and people join and leave every week. Every user has the Department attribute filled in.</p>`,
        partes: [
          { id: "a", pregunta: "You need a group that always contains exactly the Sales users, with the least administrative effort. What do you create?", tipo: "opcion", respuesta: 2,
            opciones: ["A security group with assigned membership", "A Microsoft 365 group with assigned membership and a weekly review", "A security group with dynamic user membership", "A security group with dynamic device membership"],
            pistas: ["Least administrative effort means nobody adds members by hand.", "Membership has to follow a user attribute."],
            solucion: R`Dynamic user membership with a rule such as <code>user.department -eq "Sales"</code>. Membership updates by itself when the attribute changes. Dynamic device rules look at devices, not users.` },
          { id: "b", pregunta: "An owner of that group tries to add a contractor from Marketing to it manually. What is the result?", tipo: "opcion", respuesta: 1,
            opciones: ["The contractor is added until the next rule evaluation", "The operation is not allowed", "The contractor is added permanently", "The group is converted to assigned membership"],
            pistas: ["Who decides the members of a dynamic group?"],
            solucion: R`Members of a dynamic group are decided only by the rule. To include the contractor you would change the rule or the contractor's attribute.` },
          { id: "c", pregunta: "Which TWO can be members of a Microsoft 365 group? Select two.", tipo: "multi", respuesta: [0, 2],
            opciones: ["Member users", "Devices", "Guest users", "Security groups"],
            pistas: ["Microsoft 365 groups exist for collaboration between people."],
            solucion: R`Only users, whether members or guests. Devices, service principals and nested groups can be members of security groups only.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Licences",
        enunciado: R`<p>You assign a Microsoft 365 licence to a security group named Group1. Group1 has three direct members: User1, User2 and a nested group, Group2. Group2 contains User3. User2 has no usage location set, and the tenant has no default usage location.</p>`,
        partes: [
          { id: "a", pregunta: "Which users receive the licence?", tipo: "opcion", respuesta: 0,
            opciones: ["User1 only", "User1 and User2", "User1 and User3", "User1, User2 and User3"],
            pistas: ["Does group-based licensing follow nested groups?", "What does a user need before any licence can be assigned?"],
            solucion: R`User1 only. Group-based licensing applies to direct members, so User3 gets nothing through Group2. User2 has no usage location, so the assignment fails for that user and shows as an error on the group.` },
          { id: "b", pregunta: "What is the minimum Microsoft Entra ID edition that allows group-based licensing and dynamic groups?", tipo: "opcion", respuesta: 1,
            opciones: ["Free", "P1", "P2", "It is included in every Azure subscription"],
            pistas: ["P2 adds identity protection and privileged identity management on top."],
            solucion: R`P1. P2 includes it too, but the question asks for the minimum.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Self-service password reset",
        enunciado: R`<p>Your company synchronises users from on-premises Active Directory with Microsoft Entra Connect. The help desk receives too many password calls. Management wants to try SSPR with the Finance department only, before a wider rollout.</p>`,
        partes: [
          { id: "a", pregunta: "How do you limit SSPR to Finance?", tipo: "opcion", respuesta: 3,
            opciones: ["Set SSPR to All and block other departments with a Conditional Access policy", "Create an administrative unit for Finance and enable SSPR on it", "Assign the Password Administrator role to the Finance users", "Set SSPR to Selected and choose a security group that contains the Finance users"],
            pistas: ["SSPR has three scope values.", "Selected takes a group."],
            solucion: R`Set the scope to Selected and pick a group. Administrative units scope administrator roles, not SSPR. Password Administrator lets someone reset other people's passwords.` },
          { id: "b", pregunta: "Finance users reset their password in the cloud, but the old password still works on their office PCs. What is missing?", tipo: "opcion", respuesta: 0,
            opciones: ["Password writeback", "Password hash synchronisation", "A second authentication method", "A custom domain name"],
            pistas: ["In which direction does the new password need to travel?"],
            solucion: R`Password writeback sends the new password from Entra ID back to on-premises Active Directory. Password hash synchronisation goes the other way, from on-premises to the cloud.` },
          { id: "c", pregunta: "You set the number of methods required to reset to 1 and allow security questions. A Global Administrator tests SSPR and is still asked for two methods, without security questions. Why?", tipo: "opcion", respuesta: 2,
            opciones: ["The policy takes 24 hours to apply", "Global Administrators cannot use SSPR", "Administrator accounts always follow a stricter two-method policy", "The administrator is not in the selected group"],
            pistas: ["Microsoft applies a separate policy to privileged accounts."],
            solucion: R`Administrators are always enabled for SSPR with a fixed policy: two methods, and no security questions. Your settings apply to ordinary users.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Guests and roles",
        enunciado: R`<p>Contoso works with consultants from Fabrikam. External collaboration settings allow only users in specific admin roles to invite guests. Marta, a project manager with no admin role, must be able to invite the consultants. She must not be able to do anything else in the directory.</p>`,
        partes: [
          { id: "a", pregunta: "Which role do you assign to Marta?", tipo: "opcion", respuesta: 1,
            opciones: ["User Administrator", "Guest Inviter", "Global Reader", "Contributor on the subscription"],
            pistas: ["Least privilege: look for the role that does one thing.", "Contributor is an Azure role, not an Entra role."],
            solucion: R`Guest Inviter does exactly that and nothing more. User Administrator would work but grants far more than required. Contributor is a role on Azure resources and has no effect in the directory.` },
          { id: "b", pregunta: "A consultant accepts the invitation. What kind of object now exists in Contoso's tenant?", tipo: "opcion", respuesta: 2,
            opciones: ["A member user with a Contoso password", "A synchronised user", "A guest user who signs in with the Fabrikam account", "No object. Access is granted by Fabrikam's tenant"],
            pistas: ["B2B collaboration does not create a new password."],
            solucion: R`A guest user object. The consultant authenticates in their home directory, and Contoso controls what the guest can reach.` },
          { id: "c", pregunta: "Contoso's Global Administrator opens a production subscription and cannot see any resources. What is the most likely reason?", tipo: "opcion", respuesta: 0,
            opciones: ["Entra roles do not grant access to Azure resources", "Global Administrator is a read-only role", "The subscription is in a different region", "A resource lock is hiding the resources"],
            pistas: ["Remember the two separate sets of roles."],
            solucion: R`Entra roles manage the directory. Access to subscriptions comes from Azure role assignments. A Global Administrator can choose to elevate access, which grants User Access Administrator at the root scope, but that is a deliberate extra step.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Microsoft Entra ID</strong> is the former Azure AD. Users are members or guests, cloud-only or synchronised. Deleted users can be restored for 30 days.`,
      R`<strong>Groups:</strong> security or Microsoft 365. Membership assigned, dynamic user or dynamic device. Dynamic needs P1 and cannot be edited by hand.`,
      R`<strong>Licences:</strong> a usage location is required. Group-based licensing needs P1 and ignores nested groups.`,
      R`<strong>Guests</strong> arrive through B2B invitations. External collaboration settings control who may invite. Guest Inviter is the least-privilege role.`,
      R`<strong>SSPR:</strong> None, Selected (one group) or All. Writeback for synchronised users. Administrators always need two methods.`,
      R`<strong>Entra roles are not Azure roles.</strong> A Global Administrator has no access to resources by default.`
    ] }
  ]
});

/* ───────────────────────── LESSON 3 ───────────────────────── */
LESSONS.push({
  id: "az-3", n: 3, fase: 1, codigo: "RBAC",
  titulo: "Access to Azure resources with RBAC",
  sub: "Role definitions, assignments and scopes, and how to work out what a user can really do.",
  horas: "4 hours",
  contexto: "Azure role-based access control: security principal (user, group, service principal, managed identity), role definition (Actions, NotActions, DataActions, NotDataActions, AssignableScopes), scope (management group, subscription, resource group, resource). Built-in roles: Owner, Contributor, Reader, User Access Administrator, Role Based Access Control Administrator, and resource-specific roles such as Virtual Machine Contributor and Storage Blob Data Reader. Inheritance, additive model, deny assignments. Control plane and data plane. Custom roles. Check access and effective permissions. Commands az role assignment create and New-AzRoleAssignment. Limits: 4000 role assignments per subscription.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">Think of the privilege levels on a router: who may only look at the configuration, who may change interfaces, who may create other accounts. Azure RBAC is that idea applied to everything, with one sentence to remember: <em>who</em> can do <em>what</em>, <em>where</em>.</p>
<ul>
<li><strong>Who</strong> is a security principal: a user, a group, a service principal or a managed identity.</li>
<li><strong>What</strong> is a role definition: a list of allowed operations.</li>
<li><strong>Where</strong> is a scope: a management group, a subscription, a resource group or one resource.</li>
</ul>
<p>Putting the three together is a <strong>role assignment</strong>. Nothing else grants access to Azure resources. No assignment, no access.</p>
<div class="nota"><strong>The model is additive.</strong> If you are Reader on the subscription and Contributor on one resource group, you can read everything and change what is in that group. Assignments add up, and a lower scope cannot take away what a higher scope gave. The only exception is a deny assignment, which you cannot create by hand.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. The four roles to know by heart</h3>
<div class="tabla"><table>
<thead><tr><th>Role</th><th>Manage resources</th><th>Assign roles to others</th></tr></thead>
<tbody>
<tr><td><strong>Owner</strong></td><td>Yes</td><td>Yes</td></tr>
<tr><td><strong>Contributor</strong></td><td>Yes</td><td>No</td></tr>
<tr><td><strong>Reader</strong></td><td>View only</td><td>No</td></tr>
<tr><td><strong>User Access Administrator</strong></td><td>No</td><td>Yes</td></tr>
</tbody></table></div>
<p>The classic question: someone must create and manage everything in a resource group and must not be able to give access to others. The answer is Contributor. If they must give access and manage nothing, it is User Access Administrator.</p>
<p>A newer role, <strong>Role Based Access Control Administrator</strong>, also manages role assignments and can be limited with conditions, for example to assigning only certain roles. It is the least-privilege choice when it appears among the answers.</p>

<h3>2. Roles for one kind of resource</h3>
<p>There are hundreds of built-in roles. You do not need them all, but the naming is regular and you must be able to read it.</p>
<div class="tabla"><table>
<thead><tr><th>Role</th><th>Lets you</th><th>Does not let you</th></tr></thead>
<tbody>
<tr><td>Virtual Machine Contributor</td><td>Create and manage virtual machines</td><td>Sign in to them, or manage the virtual network and storage they use</td></tr>
<tr><td>Virtual Machine Administrator Login</td><td>Sign in to a VM as administrator with an Entra account</td><td>Manage the VM resource</td></tr>
<tr><td>Network Contributor</td><td>Manage networks</td><td>Manage the VMs attached to them</td></tr>
<tr><td>Storage Account Contributor</td><td>Manage storage accounts, including the access keys</td><td>Read blobs with your Entra identity</td></tr>
<tr><td>Storage Blob Data Reader, Contributor, Owner</td><td>Read, write or fully control blob data with your Entra identity</td><td>Manage the storage account itself</td></tr>
</tbody></table></div>

<h3>3. Control plane and data plane</h3>
<p>This distinction decides many storage questions. Managing a storage account, such as changing its replication, is a <em>control plane</em> operation. Reading a blob inside it is a <em>data plane</em> operation. They are permitted separately.</p>
<p>A role definition has four lists:</p>
<div class="tabla"><table>
<thead><tr><th>Property</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><code>Actions</code></td><td>Control plane operations that are allowed</td></tr>
<tr><td><code>NotActions</code></td><td>Operations subtracted from Actions. It is a subtraction, not a deny</td></tr>
<tr><td><code>DataActions</code></td><td>Data plane operations that are allowed</td></tr>
<tr><td><code>NotDataActions</code></td><td>Operations subtracted from DataActions</td></tr>
</tbody></table></div>
<p>Owner and Contributor have <code>*</code> in Actions and nothing in DataActions. That is why an Owner of a storage account cannot read its blobs through Entra authentication without also holding a Storage Blob Data role. The Owner can still reach the data another way, by reading the access keys, because listing keys is a control plane action.</p>
<p>Contributor is defined as all actions, minus a few in NotActions: writing and deleting role assignments, among others. Since NotActions is only a subtraction, another role assignment can still grant those actions to the same user.</p>

<h3>4. Scope and inheritance</h3>
<p>A scope is written as a path:</p>
<div class="tabla"><pre>/subscriptions/SUB_ID
/subscriptions/SUB_ID/resourceGroups/rg1
/subscriptions/SUB_ID/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/vm1
/providers/Microsoft.Management/managementGroups/mg1</pre></div>
<p>An assignment at a scope applies to that scope and everything under it. Assign at the narrowest scope that does the job. That is what the exam means by least privilege.</p>

<h3>5. Creating assignments</h3>
<p>In the portal, every scope has an <strong>Access control (IAM)</strong> blade. From there: Add, Add role assignment, choose the role, choose the members.</p>
<div class="tabla"><pre>az role assignment create --assignee ana@contoso.com --role "Virtual Machine Contributor" --resource-group rg1

New-AzRoleAssignment -SignInName ana@contoso.com -RoleDefinitionName "Virtual Machine Contributor" -ResourceGroupName rg1</pre></div>
<p>To create an assignment you need the action <code>Microsoft.Authorization/roleAssignments/write</code>, which Owner, User Access Administrator and Role Based Access Control Administrator have.</p>
<p>Assign roles to groups, not to individual users. It is easier to audit, and there is a limit of 4000 role assignments per subscription.</p>

<h3>6. Interpreting access</h3>
<p>The IAM blade has three tools:</p>
<ul>
<li><strong>Check access:</strong> pick a user and see every role they hold at this scope, including inherited ones and those that come through group membership.</li>
<li><strong>Role assignments:</strong> everything assigned at this scope, with a column that says whether it is inherited and from where.</li>
<li><strong>Deny assignments:</strong> blocks created by Azure itself, for example by managed applications. A deny wins over any role assignment.</li>
</ul>
<p>To work out effective access in a question: list every assignment that reaches the resource, directly, by inheritance or through a group. Add them together. Then check whether the operation is control plane or data plane.</p>

<h3>7. Custom roles</h3>
<p>When no built-in role fits, you write your own as JSON. The usual way is to clone a built-in role and edit it.</p>
<div class="tabla"><pre>{
  "Name": "VM Operator",
  "Description": "Start, restart and deallocate virtual machines.",
  "Actions": [
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/restart/action",
    "Microsoft.Compute/virtualMachines/deallocate/action"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [ "/subscriptions/SUB_ID" ]
}</pre></div>
<p><code>AssignableScopes</code> lists where the role can be assigned. A custom role can be assigned only at those scopes or below them. If a custom role does not show up in the list for a subscription, look there first.</p>

<h3>8. Identities that are not people</h3>
<ul>
<li>A <strong>service principal</strong> is the identity of an application in the tenant.</li>
<li>A <strong>managed identity</strong> is a service principal that Azure creates and rotates for a resource, so that no password is stored anywhere. <em>System-assigned</em> lives and dies with one resource. <em>User-assigned</em> is a separate resource that several resources can share.</li>
</ul>
<p>Both receive role assignments exactly like users do. When a scenario says a virtual machine must read from a storage account without storing credentials, the answer is a managed identity plus a role assignment.</p>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 2. Role assignments and a custom role</h3>
<p>This follows the official Lab 02a, Manage Subscriptions and RBAC. It costs nothing. You need the test user from Lab 1, or create a new one.</p>
<h3>Part A. Assign and verify</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab02</code>.</li>
<li>Open its <strong>Access control (IAM)</strong> blade and assign <strong>Virtual Machine Contributor</strong> to your test user.</li>
<li>Use <strong>Check access</strong> for that user. Then open the IAM blade of the subscription and check access again. Note the difference.</li>
<li>In a private window, sign in as the test user. Try to create a storage account in the resource group and read the error message. It names the exact action that is missing.</li>
</ol>
<h3>Part B. From the command line</h3>
<div class="tabla"><pre>az role definition list --name "Virtual Machine Contributor" --output json
az role assignment list --resource-group rg-az104-lab02 --output table
az role assignment create --assignee TEST_USER_UPN --role Reader --resource-group rg-az104-lab02
az role assignment list --assignee TEST_USER_UPN --all --output table</pre></div>
<p>In the first output, find Actions, NotActions and DataActions.</p>
<h3>Part C. A custom role</h3>
<ol>
<li>In the IAM blade of the subscription, choose Add, then Add custom role. Clone the <strong>Support Request Contributor</strong> role.</li>
<li>On the JSON tab, look at the structure. Under Permissions, exclude the action that registers the support resource provider.</li>
<li>Set the assignable scope to your subscription, create the role and find it in the list of roles, filtered by type CustomRole.</li>
</ol>
<h3>Part D. The activity log</h3>
<p>Open <strong>Activity log</strong> on the resource group and find the entries named Create role assignment. This is where you look when someone asks who gave access to whom, and when.</p>
<h3>Clean up</h3>
<p>Remove the role assignments, delete the custom role and delete the resource group.</p>`,
      notas: [{ id: "lab2", label: "The exact action named in the error message, and where NotActions appears in Contributor" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Role assigned at resource group scope and checked." },
        { id: "t2", texto: "Denied operation tested as the test user." },
        { id: "t3", texto: "Role definition and assignments listed with the CLI." },
        { id: "t4", texto: "Custom role created from a clone." },
        { id: "t5", texto: "Role assignment found in the activity log." },
        { id: "t6", texto: "Everything removed." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Choosing a role",
        enunciado: R`<p>A subscription contains a resource group named RG-App. You must follow the principle of least privilege in each case.</p>`,
        partes: [
          { id: "a", pregunta: "Dev1 must create and manage all types of resources in RG-App, and must not be able to grant access to anyone. Which role, at which scope?", tipo: "opcion", respuesta: 1,
            opciones: ["Owner on RG-App", "Contributor on RG-App", "Contributor on the subscription", "User Access Administrator on RG-App"],
            pistas: ["Which role manages everything except access?", "The scope should be no wider than the requirement."],
            solucion: R`Contributor on RG-App. Owner would allow assigning roles. Contributor on the subscription is broader than needed.` },
          { id: "b", pregunta: "Sec1 must manage who has access to RG-App, and must not be able to create or change resources. Which role?", tipo: "opcion", respuesta: 3,
            opciones: ["Owner", "Contributor", "Security Admin", "User Access Administrator"],
            pistas: ["It is the mirror image of Contributor."],
            solucion: R`User Access Administrator manages role assignments and nothing else. Role Based Access Control Administrator would also be valid if it were offered.` },
          { id: "c", pregunta: "Ops1 must be able to restart virtual machines in RG-App but not delete them. No built-in role does exactly this. What do you do?", tipo: "opcion", respuesta: 2,
            opciones: ["Assign Virtual Machine Contributor and add a ReadOnly lock", "Assign Contributor and remove the delete permission in the portal", "Create a custom role with the read and restart actions and assign it", "Assign Reader and Owner together"],
            pistas: ["Built-in roles cannot be edited.", "A ReadOnly lock would block the restart as well."],
            solucion: R`A custom role with exactly the actions required. Built-in roles cannot be modified, and a ReadOnly lock blocks restart because restart is a write operation on the control plane.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Effective access",
        enunciado: R`<p>User1 is a member of Group1. These role assignments exist:</p>
<ul><li>Group1: Reader on Subscription1.</li><li>User1: Contributor on resource group RG1.</li><li>User1: Storage Account Contributor on storage account sa1, which is in resource group RG2.</li></ul>`,
        partes: [
          { id: "a", pregunta: "Can User1 create a virtual network in RG1?", tipo: "opcion", respuesta: 0,
            opciones: ["Yes", "No, because Reader is inherited from the subscription and overrides Contributor", "No, because creating a network needs Network Contributor", "Only if Group1 is also made Contributor"],
            pistas: ["Assignments add up. A higher scope does not restrict a lower one."],
            solucion: R`Yes. User1 has Reader from the group and Contributor directly on RG1. The effective permission is the sum, so User1 can create anything in RG1.` },
          { id: "b", pregunta: "Can User1 delete a virtual machine in RG2?", tipo: "opcion", respuesta: 1,
            opciones: ["Yes", "No", "Yes, because Storage Account Contributor includes compute", "Yes, after signing out and in again"],
            pistas: ["What reaches a VM in RG2? Only what is inherited from the subscription."],
            solucion: R`No. In RG2 the user has only Reader, inherited through Group1, and a storage role on one storage account.` },
          { id: "c", pregunta: "User1 signs in to the portal and tries to open a blob in sa1 using Microsoft Entra authentication. Does it work?", tipo: "opcion", respuesta: 2,
            opciones: ["Yes, Storage Account Contributor includes data access", "Yes, Reader on the subscription is enough to read blobs", "No, a Storage Blob Data role is needed for that", "No, blobs can only be read with a SAS token"],
            pistas: ["Is reading a blob a control plane or a data plane operation?", "Look at DataActions."],
            solucion: R`No. Reading a blob with an Entra identity is a data plane operation and needs a role with DataActions, such as Storage Blob Data Reader. Storage Account Contributor can list the access keys, and with a key the data is reachable, but that is a different authentication method.` }
        ] },
      { id: "q3", nivel: 3, titulo: "Custom roles and identities",
        enunciado: R`<p>You create a custom role named Role1 with this property: <code>"AssignableScopes": ["/subscriptions/SUB1/resourceGroups/RG1"]</code>. Your tenant has two subscriptions, SUB1 and SUB2.</p>`,
        partes: [
          { id: "a", pregunta: "Where can Role1 be assigned?", tipo: "opcion", respuesta: 1,
            opciones: ["Anywhere in SUB1", "On RG1 and on resources inside RG1", "On RG1 only, not on its resources", "Anywhere in SUB1 and SUB2"],
            pistas: ["A role can be assigned at its assignable scopes and below them."],
            solucion: R`On RG1 and anything under it. To use the role elsewhere, add more scopes to AssignableScopes.` },
          { id: "b", pregunta: "An application on a virtual machine must read blobs from a storage account. No credentials may be stored in code or configuration. What do you configure? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["Enable a system-assigned managed identity on the virtual machine", "Store the storage account key in an environment variable", "Assign the Reader role on the storage account to the virtual machine", "Assign the Storage Blob Data Reader role on the storage account to the identity"],
            pistas: ["One answer creates the identity, the other gives it data access.", "Reader is a control plane role."],
            solucion: R`A managed identity gives the VM an identity with no stored secret, and Storage Blob Data Reader gives that identity data plane access. Reader only allows viewing the account's properties.` },
          { id: "c", pregunta: "The Contributor role lists Microsoft.Authorization/*/Write under NotActions. User2 has Contributor on a subscription and User Access Administrator on the same subscription. Can User2 create role assignments?", tipo: "opcion", respuesta: 0,
            opciones: ["Yes, because NotActions only subtracts from the same role and the other role grants the action", "No, because NotActions is an explicit deny", "No, because two roles cannot be held at the same scope", "Only on resource groups, not on the subscription"],
            pistas: ["Is NotActions a deny or a subtraction?"],
            solucion: R`Yes. NotActions removes operations from what that one role grants. It is not a deny. The second role grants the action, and assignments add up.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Role assignment = security principal + role definition + scope.</strong> Scopes: management group, subscription, resource group, resource. Inherited downwards.`,
      R`<strong>Owner</strong> manages everything and access. <strong>Contributor</strong> everything except access. <strong>Reader</strong> views. <strong>User Access Administrator</strong> manages access only.`,
      R`<strong>Assignments add up.</strong> NotActions is a subtraction inside one role, not a deny.`,
      R`<strong>Control plane is not data plane.</strong> Reading blobs with Entra ID needs a Storage Blob Data role, even for an Owner.`,
      R`<strong>Custom roles</strong> are JSON with Actions, NotActions, DataActions, NotDataActions and AssignableScopes.`,
      R`<strong>Managed identity + role assignment</strong> is the answer whenever a resource must reach another without stored credentials.`
    ] }
  ]
});

/* ───────────────────────── LESSON 4 ───────────────────────── */
LESSONS.push({
  id: "az-4", n: 4, fase: 1, codigo: "Governance",
  titulo: "Subscriptions, policy, locks, tags and cost",
  sub: "Keeping an Azure estate organised, compliant and within budget.",
  horas: "5 hours",
  contexto: "Management groups (root, six levels, one parent), subscriptions, resource groups and moving resources. Azure Policy: definitions, initiatives, assignments, exclusions and exemptions; effects Deny, Audit, Append, Modify, DeployIfNotExists, AuditIfNotExists, Disabled; remediation tasks with managed identity; compliance. Resource locks CanNotDelete and ReadOnly, inherited, applied to the control plane. Tags: not inherited, 50 per resource, enforced or inherited with policy. Cost Management: cost analysis, budgets and alerts with action groups, Azure Advisor recommendations, reservations and Azure Hybrid Benefit. Policy compared with RBAC.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">RBAC decides who may act. It says nothing about what the result must look like. A Contributor may create a virtual machine, and nothing in RBAC stops them from creating the most expensive size in a region on the other side of the world. Governance is the set of tools that put rules on the resources themselves.</p>
<p>A firewall analogy works well here. RBAC is authentication on the management interface: who gets in. <strong>Azure Policy</strong> is the rule base: what is permitted, whoever asks. A <strong>lock</strong> is a physical cover over the power switch: it stops accidents, even by the most senior engineer. <strong>Tags</strong> are the labels on the cables. <strong>Budgets</strong> are the traffic alarms.</p>
<div class="nota"><strong>Policy or RBAC?</strong> If the requirement mentions a person or a team, think RBAC. If it mentions a property of resources, such as location, size, tag or SKU, think Policy. Many questions offer both, and only one matches the wording.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Management groups</h3>
<ul>
<li>Every tenant has one <strong>root management group</strong>. All other management groups and all subscriptions sit under it.</li>
<li>The tree can be six levels deep, not counting the root and the subscription level.</li>
<li>Each management group and each subscription has exactly one parent.</li>
<li>Role assignments and policy assignments made on a management group are inherited by everything below.</li>
<li>A new subscription lands in the root group unless you set a different default.</li>
</ul>

<h3>2. Subscriptions and resource groups</h3>
<p>Reasons to have more than one subscription: separate invoices, separate environments such as production and development, and subscription limits. A subscription can be moved to another management group. It can also be transferred to another tenant, and when that happens all its role assignments are lost, because they pointed to identities in the old directory.</p>
<p><strong>Moving resources.</strong> Most resources can be moved to another resource group or subscription. Know these facts:</p>
<ul>
<li>A move does not change the region of the resource. Moving between regions is a different operation.</li>
<li>During the move, source and destination groups are locked for writes and deletes, but the resources keep running.</li>
<li>The resource ID changes, because the ID contains the resource group name. Scripts that use the old ID must be updated.</li>
<li>Role assignments made directly on a moved resource are not carried over. Those inherited from the new parent apply.</li>
<li>Not everything can be moved. The portal validates before starting.</li>
</ul>

<h3>3. Azure Policy</h3>
<div class="tabla"><table>
<thead><tr><th>Piece</th><th>What it is</th></tr></thead>
<tbody>
<tr><td><strong>Definition</strong></td><td>One rule: a condition and an effect. Hundreds are built in, and you can write your own in JSON</td></tr>
<tr><td><strong>Initiative</strong></td><td>A set of definitions managed as one unit, for example a security baseline</td></tr>
<tr><td><strong>Assignment</strong></td><td>A definition or initiative applied to a scope, with parameter values</td></tr>
<tr><td><strong>Exclusion</strong></td><td>A child scope left out of an assignment when you create it</td></tr>
<tr><td><strong>Exemption</strong></td><td>A resource or scope waived afterwards, with a reason and an optional expiry date</td></tr>
</tbody></table></div>
<p>The effects, and what each does to a request:</p>
<div class="tabla"><table>
<thead><tr><th>Effect</th><th>What happens</th><th>Touches existing resources?</th></tr></thead>
<tbody>
<tr><td><strong>Deny</strong></td><td>The create or update request fails</td><td>No. They are only reported as non-compliant</td></tr>
<tr><td><strong>Audit</strong></td><td>The request succeeds and is logged as non-compliant</td><td>Reported only</td></tr>
<tr><td><strong>Append</strong></td><td>Adds fields to the request, such as a tag</td><td>No</td></tr>
<tr><td><strong>Modify</strong></td><td>Adds, changes or removes properties or tags</td><td>Yes, with a remediation task</td></tr>
<tr><td><strong>DeployIfNotExists</strong></td><td>After the resource is created, deploys a related resource if it is missing, such as a diagnostic setting</td><td>Yes, with a remediation task</td></tr>
<tr><td><strong>AuditIfNotExists</strong></td><td>Logs when a related resource is missing</td><td>Reported only</td></tr>
<tr><td><strong>Disabled</strong></td><td>Switches the rule off without deleting the assignment</td><td>No</td></tr>
</tbody></table></div>
<p>Details that decide questions:</p>
<ul>
<li><strong>Policy does not fix existing resources by itself.</strong> A new Deny policy does not delete or stop anything that already exists. It marks it non-compliant and blocks future changes that break the rule.</li>
<li><strong>Remediation</strong> is available only for Modify and DeployIfNotExists. The assignment uses a managed identity, which needs the roles listed in the definition, to change the resources.</li>
<li>Compliance is evaluated when an assignment is created or changed, when a resource is created or updated, and in a full scan about every 24 hours. Results are not instant.</li>
<li>Built-in definitions you should recognise: <em>Allowed locations</em>, <em>Allowed virtual machine size SKUs</em>, <em>Not allowed resource types</em>, <em>Require a tag and its value on resources</em>, <em>Inherit a tag from the resource group</em>.</li>
<li>Policy wins over RBAC in one sense: an Owner is still blocked by a Deny policy.</li>
</ul>

<h3>4. Resource locks</h3>
<div class="tabla"><table>
<thead><tr><th>Lock</th><th>Portal name</th><th>Read</th><th>Modify</th><th>Delete</th></tr></thead>
<tbody>
<tr><td>CanNotDelete</td><td>Delete</td><td>Yes</td><td>Yes</td><td>No</td></tr>
<tr><td>ReadOnly</td><td>Read-only</td><td>Yes</td><td>No</td><td>No</td></tr>
</tbody></table></div>
<ul>
<li>Locks can be placed on a subscription, a resource group or a resource, and are inherited by everything below.</li>
<li>They apply to everyone, including Owners. To delete a locked resource, remove the lock first.</li>
<li>Creating or removing locks needs Owner or User Access Administrator. Contributor cannot.</li>
<li>Locks act on the control plane only. A ReadOnly lock on a storage account does not stop someone uploading a blob with a key they already have. It does stop listing the keys, because that operation is a POST request, and it does stop changing the account's settings.</li>
<li>A ReadOnly lock on a resource group that contains a virtual machine prevents starting and restarting the machine, because those are write operations.</li>
</ul>

<h3>5. Tags</h3>
<ul>
<li>A tag is a name and value pair, such as <code>CostCenter = 4420</code>. Up to 50 per resource, resource group or subscription.</li>
<li><strong>Tags are not inherited.</strong> A tag on a resource group does not appear on its resources. To copy it down, use the policy <em>Inherit a tag from the resource group</em>, which has the Modify effect.</li>
<li>To make a tag compulsory, use the policy <em>Require a tag on resources</em>, which has the Deny effect.</li>
<li>Tags show up in cost analysis, so you can group the bill by cost centre or project.</li>
<li>Applying tags needs write access to the resource, or the Tag Contributor role, which can manage tags without access to the resource itself.</li>
</ul>

<h3>6. Cost management</h3>
<ul>
<li><strong>Cost analysis</strong> shows actual and forecast cost, filtered and grouped by resource, service, location or tag.</li>
<li><strong>Budgets</strong> set an amount for a scope and a period, with alerts at thresholds of actual or forecast cost. An alert can send an email or trigger an action group, which in turn can run automation. <em>A budget does not stop spending by itself.</em></li>
<li><strong>Azure Advisor</strong> gives recommendations in five categories: Cost, Security, Reliability, Operational excellence and Performance. Under Cost it flags idle and underused virtual machines to shut down or resize, and suggests reservations.</li>
<li><strong>Reservations</strong> commit to one or three years of a resource for a discount. <strong>Azure Hybrid Benefit</strong> reuses Windows Server and SQL Server licences you already own. <strong>Spot</strong> virtual machines use spare capacity at a large discount and can be evicted at any time.</li>
<li>The <strong>pricing calculator</strong> estimates the cost of a design before you deploy it.</li>
<li>A <em>stopped</em> virtual machine is still billed for compute. It must be <em>stopped (deallocated)</em> for the compute charge to end. Disks are billed either way.</li>
</ul>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 3. Tags, policy and a lock</h3>
<p>This follows the official Lab 02b, Manage Governance via Azure Policy. It costs nothing if you delete the storage accounts at the end.</p>
<h3>Part A. A tag and a Deny policy</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab03</code> and give it the tag <code>CostCenter = 000</code>.</li>
<li>Open <strong>Policy</strong>, then <strong>Definitions</strong>. Find <em>Require a tag and its value on resources</em> and assign it to the resource group, with tag name CostCenter and value 000.</li>
<li>Try to create a storage account in the group without the tag. Read the error: it names the policy that blocked you.</li>
</ol>
<h3>Part B. Replace Deny with Modify</h3>
<ol>
<li>Delete that assignment. Assign <em>Inherit a tag from the resource group if missing</em>, with tag name CostCenter.</li>
<li>On the Remediation tab, tick Create a remediation task and note that a managed identity is created.</li>
<li>Create a storage account without tags. After it deploys, look at its tags.</li>
</ol>
<h3>Part C. A lock</h3>
<ol>
<li>On the resource group, open <strong>Locks</strong> and add a Delete lock.</li>
<li>Try to delete the storage account. Then try to delete the resource group.</li>
<li>Change a setting on the storage account to confirm that modifying still works.</li>
</ol>
<h3>Part D. The command line</h3>
<div class="tabla"><pre>az tag list --output table
az policy assignment list --resource-group rg-az104-lab03 --output table
az lock list --resource-group rg-az104-lab03 --output table
az lock delete --name LOCK_NAME --resource-group rg-az104-lab03</pre></div>
<h3>Part E. Advisor</h3>
<p>Open <strong>Advisor</strong> and look at the five categories. A new subscription has few recommendations. Return to this blade after the compute labs.</p>
<h3>Clean up</h3>
<p>Remove the lock, then the policy assignment, then delete the resource group.</p>`,
      notas: [{ id: "lab3", label: "The wording of the policy error, and whether the storage account received the tag" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Deny policy assigned and a deployment blocked by it." },
        { id: "t2", texto: "Modify policy assigned with a remediation task." },
        { id: "t3", texto: "Delete lock tested on a resource and on the group." },
        { id: "t4", texto: "Policy assignments and locks listed with the CLI." },
        { id: "t5", texto: "Everything removed, lock first." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Policy or something else",
        enunciado: R`<p>Your company has three subscriptions under one management group named MG-Corp.</p>`,
        partes: [
          { id: "a", pregunta: "Resources must be created only in West Europe and North Europe, in all three subscriptions, with one configuration. What do you use?", tipo: "opcion", respuesta: 2,
            opciones: ["A custom RBAC role assigned on MG-Corp", "A ReadOnly lock on each subscription", "The Allowed locations policy assigned to MG-Corp", "A budget on MG-Corp"],
            pistas: ["The requirement is about a property of resources, not about people.", "One configuration means one assignment at a scope above all three."],
            solucion: R`Azure Policy, with the built-in definition Allowed locations, assigned once on the management group so that all subscriptions inherit it.` },
          { id: "b", pregunta: "After you assign that policy, you find five virtual machines already running in East US. What happens to them?", tipo: "opcion", respuesta: 1,
            opciones: ["They are deleted at the next compliance scan", "They keep running and are reported as non-compliant", "They are moved to West Europe", "They are stopped and deallocated"],
            pistas: ["What does Deny act on: requests, or resources that already exist?"],
            solucion: R`A Deny effect blocks new requests. Existing resources are not touched. They appear as non-compliant in the compliance view.` },
          { id: "c", pregunta: "A critical virtual network must not be deleted by accident. Administrators must still be able to change its settings. What do you configure?", tipo: "opcion", respuesta: 0,
            opciones: ["A CanNotDelete lock on the virtual network", "A ReadOnly lock on the virtual network", "The Reader role for all administrators", "A Deny policy for the delete operation"],
            pistas: ["Which lock still allows modification?"],
            solucion: R`A CanNotDelete lock, shown in the portal as Delete. ReadOnly would also block changes.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Tags",
        enunciado: R`<p>Finance wants the monthly bill broken down by department. Each resource group already has a Department tag. The resources inside have no tags.</p>`,
        partes: [
          { id: "a", pregunta: "In cost analysis, grouping by the Department tag shows almost all cost as untagged. Why?", tipo: "opcion", respuesta: 3,
            opciones: ["Cost analysis does not support tags", "Tags take 30 days to appear", "Only subscription tags are used for billing", "Resources do not inherit tags from their resource group"],
            pistas: ["Where does the cost come from, the group or the resources?"],
            solucion: R`Tags are not inherited. Cost is generated by resources, and the resources have no tag.` },
          { id: "b", pregunta: "You need existing and new resources to receive the Department tag of their resource group, with the least effort. What do you do? Select two.", tipo: "multi", respuesta: [1, 2],
            opciones: ["Assign the policy Require a tag on resources", "Assign the policy Inherit a tag from the resource group", "Run a remediation task for the assignment", "Add a CanNotDelete lock to each resource group"],
            pistas: ["One answer handles new resources, the other handles the ones that exist.", "Which effect can change existing resources?"],
            solucion: R`The Inherit a tag policy uses the Modify effect, which tags new and updated resources. A remediation task applies it to resources that already exist. Require a tag would only block untagged deployments.` },
          { id: "c", pregunta: "A help-desk user must be able to edit tags on any resource in a subscription, with no other permission on the resources. Which role?", tipo: "opcion", respuesta: 1,
            opciones: ["Contributor", "Tag Contributor", "Reader", "User Access Administrator"],
            pistas: ["There is a built-in role named after the task."],
            solucion: R`Tag Contributor manages tags on entities without granting access to the entities themselves.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Locks",
        enunciado: R`<p>Resource group RG1 has a ReadOnly lock. It contains a stopped virtual machine VM1 and a storage account sa1. Admin1 is Owner of the subscription.</p>`,
        partes: [
          { id: "a", pregunta: "Admin1 tries to start VM1. What happens?", tipo: "opcion", respuesta: 1,
            opciones: ["VM1 starts, because Owners are not affected by locks", "The operation fails", "VM1 starts, because starting is not a modification", "VM1 starts only from PowerShell"],
            pistas: ["Locks apply to every user.", "Is start a read or a write on the control plane?"],
            solucion: R`It fails. Starting a VM is a write operation, the lock is inherited from the group, and locks apply to Owners too.` },
          { id: "b", pregunta: "Admin1 tries to view the access keys of sa1 in the portal. What happens?", tipo: "opcion", respuesta: 0,
            opciones: ["It fails, because listing keys is a POST operation", "It works, because viewing keys is a read", "It works, because locks do not apply to storage", "It fails, because Owners cannot see keys"],
            pistas: ["Listing keys is not implemented as a GET request."],
            solucion: R`It fails. List Keys is a POST operation, since the keys allow writing, so a ReadOnly lock blocks it.` },
          { id: "c", pregunta: "Who can remove the lock?", tipo: "opcion", respuesta: 2,
            opciones: ["Any Contributor of RG1", "Only a Global Administrator", "An Owner or a User Access Administrator", "Nobody. The lock expires after 30 days"],
            pistas: ["Managing locks needs Microsoft.Authorization actions."],
            solucion: R`Owner and User Access Administrator have the Microsoft.Authorization/locks permissions. Contributor does not.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Cost",
        enunciado: R`<p>A development subscription regularly exceeds its expected spend of 500 euros a month.</p>`,
        partes: [
          { id: "a", pregunta: "You create a budget of 500 euros with an alert at 100 %. The subscription reaches 620 euros. What did the budget do?", tipo: "opcion", respuesta: 1,
            opciones: ["It stopped all virtual machines at 500 euros", "It sent the alert notification, and spending continued", "It blocked new deployments at 500 euros", "It deleted the most expensive resource"],
            pistas: ["A budget is an alarm."],
            solucion: R`A budget only notifies. To act automatically, connect the alert to an action group that runs an automation runbook or a logic app.` },
          { id: "b", pregunta: "Where do you find a list of virtual machines with very low CPU use that could be shut down or resized?", tipo: "opcion", respuesta: 2,
            opciones: ["Azure Policy compliance", "Resource locks", "Azure Advisor, Cost recommendations", "The activity log"],
            pistas: ["Which service gives recommendations in five categories?"],
            solucion: R`Azure Advisor. Its Cost category identifies idle and underused resources.` },
          { id: "c", pregunta: "Developers shut down their VMs from inside the operating system every evening, but compute charges continue overnight. Why?", tipo: "opcion", respuesta: 0,
            opciones: ["The VMs are stopped but not deallocated", "Budgets take 24 hours to apply", "Shutting down from the OS is blocked by policy", "Azure bills a minimum of 24 hours per VM"],
            pistas: ["There are two stopped states."],
            solucion: R`Shutting down inside the guest leaves the VM in the Stopped state, with its hardware still reserved and billed. Stopping it from the portal, CLI or PowerShell puts it in Stopped (deallocated), which ends the compute charge.` },
          { id: "d", pregunta: "A subscription is moved to a different Microsoft Entra tenant. What happens to its role assignments?", tipo: "opcion", respuesta: 3,
            opciones: ["They are kept", "They are converted to guest assignments", "They are kept for 30 days", "They are permanently removed"],
            pistas: ["Which directory did the assignments point to?"],
            solucion: R`They are deleted, because they referred to identities in the old tenant. Access must be granted again in the new one.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Management groups:</strong> one root, six levels, one parent each. Roles and policies assigned there are inherited by all subscriptions below.`,
      R`<strong>Policy</strong> governs resource properties. Deny blocks new requests and leaves existing resources alone. Only Modify and DeployIfNotExists can remediate, using a managed identity.`,
      R`<strong>Locks:</strong> CanNotDelete and ReadOnly. Inherited, apply to Owners, control plane only. Owner or User Access Administrator to manage them.`,
      R`<strong>Tags are not inherited.</strong> 50 per resource. Enforce with Require a tag, copy down with Inherit a tag.`,
      R`<strong>Budgets alert, they do not stop.</strong> Advisor finds idle resources. Deallocate a VM to stop paying for compute.`,
      R`<strong>Person in the requirement: RBAC. Resource property in the requirement: Policy.</strong>`
    ] }
  ]
});


/* ───────────────────────── LESSON 5 ───────────────────────── */
LESSONS.push({
  id: "az-5", n: 5, fase: 2, codigo: "Storage accounts",
  titulo: "Storage accounts, redundancy and encryption",
  sub: "Choosing the right kind of account, deciding how many copies of the data exist and where, and moving data in and out.",
  horas: "4 hours",
  contexto: "Storage account kinds: Standard general-purpose v2, Premium block blobs, Premium file shares, Premium page blobs. Naming rules and endpoints. Redundancy: LRS, ZRS, GRS, GZRS, RA-GRS, RA-GZRS; failover to the secondary region; which changes are possible after creation. Object replication for block blobs (needs versioning on both accounts and change feed on the source). Encryption at rest: always on, Microsoft-managed or customer-managed keys in Key Vault, encryption scopes, infrastructure encryption only at creation. Secure transfer and minimum TLS. Tools: Storage Explorer, storage browser, AzCopy (copy, sync, login, SAS), Import/Export and Data Box.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">A storage account is the equivalent of a storage array that you never see. You choose its class of disk, how many copies it keeps and in how many sites, and Azure gives you four services on top: objects, file shares, queues and tables. Everything else in this domain is a setting on that account or on something inside it.</p>
<p>The redundancy options are easiest to remember as a transport network problem. One site with three copies protects against a failed disk or rack. Three sites in the same metro area protect against losing a building. A second region hundreds of kilometres away protects against losing the metro area. Each step costs more, and the far copy is always a little behind, because it is replicated asynchronously.</p>
<div class="nota"><strong>What the exam does with this.</strong> It gives a requirement, such as "data must survive the loss of a datacentre, at the lowest cost" or "the application must be able to read during a regional outage", and asks for the redundancy option. The four letters decide the answer, so learn exactly what each adds.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Kinds of storage account</h3>
<div class="tabla"><table>
<thead><tr><th>Kind</th><th>Services</th><th>Disk</th><th>Redundancy available</th></tr></thead>
<tbody>
<tr><td><strong>Standard general-purpose v2</strong></td><td>Blob, Files, Queue, Table</td><td>HDD</td><td>All six options</td></tr>
<tr><td><strong>Premium block blobs</strong></td><td>Block and append blobs</td><td>SSD</td><td>LRS, ZRS</td></tr>
<tr><td><strong>Premium file shares</strong></td><td>Azure Files, SMB and NFS</td><td>SSD</td><td>LRS, ZRS</td></tr>
<tr><td><strong>Premium page blobs</strong></td><td>Page blobs</td><td>SSD</td><td>LRS</td></tr>
</tbody></table></div>
<ul>
<li>The performance tier, Standard or Premium, is chosen at creation and <strong>cannot be changed</strong>. To move from one to the other you create a new account and copy the data.</li>
<li>Premium accounts have no geo-redundant options and no access tiers.</li>
<li>General-purpose v2 is the default answer unless the scenario asks for low latency or NFS file shares.</li>
</ul>

<h3>2. Names and endpoints</h3>
<p>An account name has 3 to 24 characters, lowercase letters and digits only, and must be unique in all of Azure, because it becomes part of a public DNS name:</p>
<div class="tabla"><pre>https://ACCOUNT.blob.core.windows.net
https://ACCOUNT.file.core.windows.net
https://ACCOUNT.queue.core.windows.net
https://ACCOUNT.table.core.windows.net</pre></div>

<h3>3. Redundancy</h3>
<div class="tabla"><table>
<thead><tr><th>Option</th><th>Copies and where</th><th>Survives</th></tr></thead>
<tbody>
<tr><td><strong>LRS</strong>, locally redundant</td><td>3 copies in one datacentre</td><td>Disk or rack failure</td></tr>
<tr><td><strong>ZRS</strong>, zone-redundant</td><td>3 copies in 3 availability zones of one region, written synchronously</td><td>Loss of a datacentre or zone</td></tr>
<tr><td><strong>GRS</strong>, geo-redundant</td><td>LRS in the primary region, plus 3 more copies in the paired region, sent asynchronously</td><td>Loss of the region</td></tr>
<tr><td><strong>GZRS</strong>, geo-zone-redundant</td><td>ZRS in the primary region, plus 3 copies in the paired region</td><td>Loss of a zone or of the region</td></tr>
<tr><td><strong>RA-GRS</strong> and <strong>RA-GZRS</strong></td><td>The same as GRS and GZRS, and the secondary copy can be read at any time</td><td>The same, with reads available during an outage</td></tr>
</tbody></table></div>
<p>Details that decide questions:</p>
<ul>
<li>With plain GRS or GZRS the secondary copy exists but <strong>cannot be read</strong> until a failover happens. Only the RA options expose a read-only endpoint, <code>ACCOUNT-secondary.blob.core.windows.net</code>.</li>
<li>Replication to the secondary region is asynchronous. Recent writes can be lost in a disaster. The Last Sync Time property tells you how far behind it is.</li>
<li>After a customer-managed failover, the secondary becomes the primary and the account is <strong>LRS</strong> in the new region. You must enable geo-redundancy again.</li>
<li>You can switch between LRS and GRS, or add read access, at any time in the Redundancy blade. Moving to or from ZRS needs a conversion, which you request in the portal and which can take time.</li>
<li>The archive access tier is not available in accounts with ZRS, GZRS or RA-GZRS.</li>
<li>Lowest cost that survives a datacentre failure: ZRS. Lowest cost that survives a regional failure: GRS. Highest availability: RA-GZRS.</li>
</ul>

<h3>4. Object replication</h3>
<p>Geo-redundancy copies the whole account to one fixed paired region. <strong>Object replication</strong> is different: it copies block blobs from a container in one account to a container in another account, in any region you choose, according to a policy with rules and optional prefix filters.</p>
<ul>
<li>It requires <strong>blob versioning on both accounts</strong> and the <strong>change feed on the source</strong>. The portal turns them on when you create the policy.</li>
<li>It is asynchronous and one-way.</li>
<li>You cannot write to a destination container that is the target of a rule, except through replication.</li>
<li>Typical uses: keeping a copy close to users in another continent, or feeding a second account used for analytics.</li>
</ul>

<h3>5. Encryption</h3>
<ul>
<li>Data at rest is always encrypted with 256-bit AES. This <strong>cannot be turned off</strong>.</li>
<li>By default the keys are <strong>Microsoft-managed</strong>. You can switch to <strong>customer-managed keys</strong> stored in Azure Key Vault. The vault must have soft delete and purge protection enabled, and the storage account reaches it with a managed identity.</li>
<li>An <strong>encryption scope</strong> lets one container or blob use a different key from the rest of the account.</li>
<li><strong>Infrastructure encryption</strong> adds a second layer with a different key. It can be enabled <strong>only when the account is created</strong>.</li>
<li>In transit: <strong>Secure transfer required</strong> is on by default and rejects HTTP. You can also set a minimum TLS version.</li>
</ul>

<h3>6. Moving data</h3>
<div class="tabla"><table>
<thead><tr><th>Tool</th><th>What it is</th><th>Use it when</th></tr></thead>
<tbody>
<tr><td><strong>Storage browser</strong></td><td>A blade in the portal</td><td>Quick look, a few files</td></tr>
<tr><td><strong>Azure Storage Explorer</strong></td><td>A desktop application for Windows, macOS and Linux</td><td>Interactive work across accounts and subscriptions. It uses AzCopy underneath</td></tr>
<tr><td><strong>AzCopy</strong></td><td>A command-line tool</td><td>Scripts, large transfers, copies between accounts</td></tr>
<tr><td><strong>Azure Import/Export</strong> and <strong>Data Box</strong></td><td>Physical disks or appliances shipped by courier</td><td>So much data that the network would take weeks</td></tr>
</tbody></table></div>
<p>AzCopy commands to recognise:</p>
<div class="tabla"><pre>azcopy login
azcopy make "https://ACCOUNT.blob.core.windows.net/container1"
azcopy copy "C:\data" "https://ACCOUNT.blob.core.windows.net/container1" --recursive
azcopy copy "https://SRC.blob.core.windows.net/c1?SAS" "https://DST.blob.core.windows.net/c1?SAS" --recursive
azcopy sync "C:\data" "https://ACCOUNT.blob.core.windows.net/container1"</pre></div>
<ul>
<li>AzCopy authenticates with Microsoft Entra ID, after <code>azcopy login</code>, or with a SAS token added to the URL. It does not take the account key.</li>
<li>With Entra ID you need a data role such as Storage Blob Data Contributor. Being Owner of the account is not enough.</li>
<li>A copy between two accounts goes directly from server to server. The data does not pass through your computer.</li>
<li><code>copy</code> transfers everything. <code>sync</code> transfers only what differs, and with <code>--delete-destination</code> it also removes what no longer exists in the source.</li>
<li>AzCopy works with Blob Storage and Azure Files.</li>
</ul>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 4. A storage account from end to end</h3>
<p>This follows the first part of the official Lab 07, Manage Azure Storage. With a few small files the cost is a few cents.</p>
<h3>Part A. Create and inspect</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab04</code>. Create a storage account in it: Standard performance, redundancy GRS with read access.</li>
<li>Before pressing Create, walk through the Advanced and Encryption tabs. Find Secure transfer, Minimum TLS version and Infrastructure encryption, and note which of them you can change later.</li>
<li>After deployment, open <strong>Redundancy</strong>. Look at the map, the primary and secondary endpoints and the Last Sync Time.</li>
<li>Change the redundancy to LRS and save. Note that it was allowed without creating a new account.</li>
</ol>
<h3>Part B. The command line</h3>
<div class="tabla"><pre>az storage account create --name UNIQUENAME --resource-group rg-az104-lab04 --location westeurope --sku Standard_LRS --kind StorageV2
az storage account show --name UNIQUENAME --query "{sku:sku.name, kind:kind, tls:minimumTlsVersion, https:enableHttpsTrafficOnly}"
az storage account update --name UNIQUENAME --resource-group rg-az104-lab04 --sku Standard_GRS</pre></div>
<p>The SKU names encode the tier and the redundancy: <code>Standard_LRS</code>, <code>Standard_ZRS</code>, <code>Standard_GRS</code>, <code>Standard_RAGRS</code>, <code>Standard_GZRS</code>, <code>Standard_RAGZRS</code>, <code>Premium_LRS</code>, <code>Premium_ZRS</code>.</p>
<h3>Part C. AzCopy</h3>
<ol>
<li>In Cloud Shell, AzCopy is already installed. Assign yourself <strong>Storage Blob Data Contributor</strong> on the account and wait a minute.</li>
<li>Create a container and upload a file.</li>
</ol>
<div class="tabla"><pre>azcopy login --identity
echo "hello" > test.txt
azcopy make "https://UNIQUENAME.blob.core.windows.net/data"
azcopy copy "test.txt" "https://UNIQUENAME.blob.core.windows.net/data"
azcopy list "https://UNIQUENAME.blob.core.windows.net/data"</pre></div>
<p>If <code>azcopy login --identity</code> does not work in your shell, run <code>azcopy login</code> and follow the device code prompt. Before assigning the role, try the upload once, so that you see the 403 error that Owners get without a data role.</p>
<h3>Part D. Object replication</h3>
<ol>
<li>Create a second storage account in another region.</li>
<li>On the first account, open <strong>Object replication</strong> and create a rule from the <code>data</code> container to a new container in the second account.</li>
<li>Check <strong>Data protection</strong> on both accounts and see that versioning is now enabled, and the change feed on the source.</li>
<li>Upload another file and wait for it to appear on the other side.</li>
</ol>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab4", label: "Which settings were greyed out after creation, and how long object replication took" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Account created with RA-GRS and secondary endpoint found." },
        { id: "t2", texto: "Redundancy changed after creation." },
        { id: "t3", texto: "Account created and updated with the CLI." },
        { id: "t4", texto: "File uploaded with AzCopy using Entra ID." },
        { id: "t5", texto: "Object replication rule created and tested." },
        { id: "t6", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Choosing redundancy",
        enunciado: R`<p>You are creating storage accounts for three workloads. In each case, choose the option that meets the requirement at the lowest cost.</p>`,
        partes: [
          { id: "a", pregunta: "Data must remain available if a single datacentre in the region fails. A regional outage is an accepted risk.", tipo: "opcion", respuesta: 1,
            opciones: ["LRS", "ZRS", "GRS", "RA-GZRS"],
            pistas: ["Which option spreads copies across datacentres inside one region?"],
            solucion: R`ZRS keeps three synchronous copies in three availability zones. LRS keeps all copies in one datacentre. GRS would also survive, but costs more and is not required.` },
          { id: "b", pregunta: "Data must survive the loss of the whole primary region. Nobody needs to read the copy unless a failover takes place.", tipo: "opcion", respuesta: 2,
            opciones: ["LRS", "ZRS", "GRS", "RA-GRS"],
            pistas: ["Read access to the secondary is not required. Do not pay for it."],
            solucion: R`GRS. RA-GRS adds a readable secondary endpoint that the scenario does not ask for.` },
          { id: "c", pregunta: "A reporting application must keep reading the data during an outage of the primary region, and the primary region must also tolerate the loss of a zone.", tipo: "opcion", respuesta: 3,
            opciones: ["ZRS", "GRS", "RA-GRS", "RA-GZRS"],
            pistas: ["Two requirements: zones in the primary, and reads from the secondary."],
            solucion: R`RA-GZRS combines zone redundancy in the primary region, a geo copy, and read access to that copy.` }
        ] },
      { id: "q2", nivel: 2, titulo: "What can be changed later",
        enunciado: R`<p>A storage account named contosodata was created a year ago as Standard general-purpose v2 with LRS.</p>`,
        partes: [
          { id: "a", pregunta: "The business now needs SSD-backed file shares with NFS. What must you do?", tipo: "opcion", respuesta: 2,
            opciones: ["Change the performance tier of contosodata to Premium", "Change the redundancy of contosodata to ZRS", "Create a new Premium file shares account and copy the data", "Enable the hot access tier on the account"],
            pistas: ["Can the performance tier of an existing account be changed?"],
            solucion: R`The performance tier is fixed at creation. NFS shares require a Premium file shares account, so you create one and migrate.` },
          { id: "b", pregunta: "Security asks for infrastructure encryption, a second layer of encryption, on contosodata. What do you answer?", tipo: "opcion", respuesta: 0,
            opciones: ["It can only be enabled when an account is created", "It can be enabled in the Encryption blade at any time", "It requires customer-managed keys first", "It is enabled by default on every account"],
            pistas: ["Remember which encryption settings are creation-time only."],
            solucion: R`Infrastructure encryption is a creation-time setting. Customer-managed keys, in contrast, can be configured later.` },
          { id: "c", pregunta: "Which TWO changes can be made to contosodata directly, without creating a new account? Select two.", tipo: "multi", respuesta: [0, 2],
            opciones: ["Change redundancy from LRS to GRS", "Rename the account", "Switch encryption to customer-managed keys", "Convert it to a Premium block blobs account"],
            pistas: ["The name is part of a DNS name.", "Which options live in blades you can edit?"],
            solucion: R`Redundancy between LRS and GRS, and the encryption key source, can be changed at any time. A storage account cannot be renamed, and the kind cannot be converted to Premium.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Replication",
        enunciado: R`<p>An account in West Europe uses GRS. A second requirement appears: a copy of the container named images must be kept in an account in Southeast Asia, close to a partner.</p>`,
        partes: [
          { id: "a", pregunta: "Which feature do you use for the copy in Southeast Asia?", tipo: "opcion", respuesta: 1,
            opciones: ["Change the account to RA-GRS", "Object replication", "A lifecycle management rule", "Azure File Sync"],
            pistas: ["Geo-redundancy always goes to the paired region. Is Southeast Asia the pair of West Europe?"],
            solucion: R`Object replication copies block blobs to a container in any account and region. Geo-redundant options always replicate to the fixed paired region, North Europe in this case.` },
          { id: "b", pregunta: "Which TWO features must be enabled for object replication to work? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["Blob versioning on the source and destination accounts", "Hierarchical namespace on both accounts", "Soft delete for containers", "Change feed on the source account"],
            pistas: ["Replication needs to know what changed, and to tell versions apart."],
            solucion: R`Versioning on both accounts and the change feed on the source.` },
          { id: "c", pregunta: "The primary region fails and you start a failover of the GRS account. Which redundancy does the account have when the failover completes?", tipo: "opcion", respuesta: 0,
            opciones: ["LRS", "ZRS", "GRS", "RA-GRS"],
            pistas: ["After failover there is only one region holding the data."],
            solucion: R`LRS in what was the secondary region. Geo-redundancy has to be configured again.` }
        ] },
      { id: "q4", nivel: 3, titulo: "AzCopy",
        enunciado: R`<p>You are Owner of a subscription. You run <code>azcopy login</code>, sign in successfully and then run <code>azcopy copy</code> to upload a folder to a blob container. The command fails with a 403 error.</p>`,
        partes: [
          { id: "a", pregunta: "What is the cause?", tipo: "opcion", respuesta: 2,
            opciones: ["AzCopy does not support Microsoft Entra authentication", "The storage firewall always blocks AzCopy", "Owner does not include data plane permissions on blobs", "The container must be public"],
            pistas: ["Lesson 3: Actions and DataActions."],
            solucion: R`Uploading a blob is a data plane operation. You need Storage Blob Data Contributor or Owner, or a SAS token.` },
          { id: "b", pregunta: "You must copy 2 TB of blobs from an account in one subscription to an account in another, as fast as possible. What do you run?", tipo: "opcion", respuesta: 1,
            opciones: ["Download with Storage Explorer and upload again", "azcopy copy with the source and destination URLs, each with a SAS token", "az storage account update --sku", "An Azure Import/Export job"],
            pistas: ["Does the data need to pass through your computer?"],
            solucion: R`AzCopy copies between accounts server to server. Each URL carries its own authorisation, typically a SAS token.` },
          { id: "c", pregunta: "Every night a folder must be mirrored to a container, transferring only new or changed files. Which command?", tipo: "opcion", respuesta: 3,
            opciones: ["azcopy copy --recursive", "azcopy make", "azcopy list", "azcopy sync"],
            pistas: ["One command compares source and destination."],
            solucion: R`<code>azcopy sync</code> compares names and modification times and transfers only the differences.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>General-purpose v2</strong> is the default. Premium is SSD, comes in three kinds, has no geo-redundancy and cannot be converted to or from Standard.`,
      R`<strong>LRS</strong> one datacentre. <strong>ZRS</strong> three zones. <strong>GRS</strong> adds the paired region. <strong>GZRS</strong> is ZRS plus the paired region. <strong>RA-</strong> makes the secondary readable.`,
      R`<strong>After a failover the account is LRS.</strong> Geo-replication is asynchronous, so recent writes can be lost.`,
      R`<strong>Object replication</strong> copies block blobs to any account and region. Needs versioning on both and change feed on the source.`,
      R`<strong>Encryption at rest cannot be disabled.</strong> Customer-managed keys live in Key Vault. Infrastructure encryption only at creation.`,
      R`<strong>AzCopy</strong> uses Entra ID with a data role, or a SAS. <code>copy</code> transfers, <code>sync</code> mirrors.`
    ] }
  ]
});

/* ───────────────────────── LESSON 6 ───────────────────────── */
LESSONS.push({
  id: "az-6", n: 6, fase: 2, codigo: "Storage access",
  titulo: "Securing access to storage",
  sub: "Access keys, shared access signatures, stored access policies, the storage firewall and identity-based access to file shares.",
  horas: "4 hours",
  contexto: "Authorisation options for storage: Shared Key with the two account access keys, shared access signatures (user delegation SAS, service SAS, account SAS), Microsoft Entra ID with data roles, anonymous access. Key rotation and disabling Shared Key. SAS parameters: permissions, start and expiry, allowed IP, protocol, signature. Stored access policies: up to five per container, used to change or revoke a service SAS. Storage firewall: public network access enabled, selected networks, disabled; virtual network rules with service endpoints, public IP rules, trusted Microsoft services exception, private endpoints. Azure Files identity-based authentication over SMB: on-premises AD DS, Microsoft Entra Domain Services, Microsoft Entra Kerberos; share-level roles and NTFS permissions.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">A storage account has a public address on the internet. What protects it is not secrecy of the address but two independent checks on every request: where the request comes from, and what proves it is allowed. The first is the storage firewall. The second is one of three kinds of credential.</p>
<p>Think of the three credentials as three ways to get into a building.</p>
<ul>
<li>The <strong>access key</strong> is the master key. It opens every door, has no expiry date, and does not say who is holding it.</li>
<li>A <strong>shared access signature</strong> is a visitor pass: valid for certain doors, certain actions and certain hours. Anyone who holds it can use it.</li>
<li><strong>Microsoft Entra ID</strong> is the staff badge. It is tied to a person or a service, checked against a role, and every use is logged with a name.</li>
</ul>
<div class="nota"><strong>The order Microsoft wants.</strong> Entra ID first, a user delegation SAS when you must hand out a URL, and account keys only when nothing else works. When an exam question says "most secure" or "follow best practice", that order gives the answer.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Access keys</h3>
<ul>
<li>Every account has <strong>two</strong> keys, key1 and key2. Either one gives full access to all data and to the account configuration that the data plane exposes.</li>
<li>There are two so that you can rotate without downtime: move applications to key2, regenerate key1, and next time do the opposite.</li>
<li>Regenerating a key immediately invalidates every SAS that was signed with it.</li>
<li>Keys belong in Azure Key Vault, not in code.</li>
<li>You can turn off key authorisation for the whole account with the setting <strong>Allow storage account key access</strong>. Requests signed with a key, and SAS tokens signed with a key, are then rejected. Entra ID and user delegation SAS keep working.</li>
</ul>

<h3>2. Shared access signatures</h3>
<div class="tabla"><table>
<thead><tr><th>Type</th><th>Signed with</th><th>Covers</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>User delegation SAS</strong></td><td>A key obtained with Microsoft Entra credentials</td><td>Blob Storage</td><td>The most secure. Valid for at most 7 days. Limited by the RBAC permissions of whoever created it</td></tr>
<tr><td><strong>Service SAS</strong></td><td>An account key</td><td>One service: Blob, Files, Queue or Table</td><td>Can be tied to a stored access policy</td></tr>
<tr><td><strong>Account SAS</strong></td><td>An account key</td><td>One or more services, and service-level operations</td><td>The broadest. Cannot use a stored access policy</td></tr>
</tbody></table></div>
<p>A SAS is a set of parameters added to the URL of the resource. You should be able to read one:</p>
<div class="tabla"><pre>https://acct.blob.core.windows.net/docs/report.pdf
  ?sv=2024-11-04          version
  &amp;sr=b                   resource: b blob, c container
  &amp;sp=r                   permissions: r read, w write, d delete, l list, a add, c create
  &amp;st=2026-11-20T08:00Z   start time
  &amp;se=2026-11-20T18:00Z   expiry time
  &amp;sip=203.0.113.10       allowed client IP address or range
  &amp;spr=https              allowed protocol
  &amp;sig=...                signature</pre></div>
<ul>
<li>A SAS that does not work is usually expired, not yet valid because of clock differences, used from an IP address outside <code>sip</code>, or missing the permission for the operation. Setting the start time a few minutes in the past avoids the clock problem.</li>
<li>Azure does not keep a list of the SAS tokens you issue. An ad hoc SAS cannot be revoked individually. The only ways to cancel it are to wait for expiry or to regenerate the key that signed it, which breaks every other SAS signed with that key.</li>
</ul>

<h3>3. Stored access policies</h3>
<p>A stored access policy solves that problem for service SAS tokens. It is a named set of permissions, start time and expiry time saved <em>on the container</em>, file share, queue or table. A SAS then refers to the policy by name instead of carrying its own values.</p>
<ul>
<li>To change the expiry or permissions of every SAS issued under the policy, edit the policy.</li>
<li>To revoke them all, delete the policy or rename it.</li>
<li>Up to <strong>five</strong> policies per container, share, queue or table.</li>
<li>It works with service SAS only. Not with account SAS, and not with user delegation SAS.</li>
</ul>

<h3>4. Microsoft Entra ID and anonymous access</h3>
<ul>
<li>Data roles from lesson 3: <strong>Storage Blob Data Reader</strong>, <strong>Contributor</strong> and <strong>Owner</strong>, with equivalents for queues, tables and file shares.</li>
<li>In the portal, the container view has a switch between <em>Access key</em> and <em>Microsoft Entra user account</em>. With the second, you see data only if you hold a data role.</li>
<li><strong>Anonymous access</strong> to blobs is off by default at account level, with the setting Allow Blob anonymous access. Only when it is on can a container be set to Blob or Container public access.</li>
</ul>

<h3>5. The storage firewall</h3>
<p>Under <strong>Networking</strong>, public network access has three positions:</p>
<div class="tabla"><table>
<thead><tr><th>Setting</th><th>Who reaches the public endpoint</th></tr></thead>
<tbody>
<tr><td>Enabled from all networks</td><td>Anyone on the internet, still subject to credentials. This is the default</td></tr>
<tr><td>Enabled from selected virtual networks and IP addresses</td><td>Only the sources you list</td></tr>
<tr><td>Disabled</td><td>Nobody. Access is possible only through private endpoints</td></tr>
</tbody></table></div>
<p>With selected networks you can add:</p>
<ul>
<li><strong>Virtual network rules:</strong> specific subnets. The subnet must have the <code>Microsoft.Storage</code> service endpoint enabled, which the portal offers to do for you.</li>
<li><strong>IP rules:</strong> public IPv4 addresses or ranges, such as the address of your office. Private ranges like 10.0.0.0/8 are not accepted, because the firewall only ever sees public source addresses.</li>
<li><strong>Exceptions:</strong> allow trusted Microsoft services, so that services such as Azure Backup or Azure Monitor can still reach the account.</li>
<li><strong>Resource instances:</strong> specific Azure resources identified by their managed identity.</li>
</ul>
<p>The firewall and the credentials are both required. A valid SAS used from a network that is not allowed gets a 403.</p>
<p>A <strong>private endpoint</strong> gives the account a private IP address inside your virtual network. It is covered in depth in lesson 14. For now: service endpoints keep the public address and restrict who can reach it. Private endpoints add a private address, and let you disable the public one.</p>

<h3>6. Identity-based access for Azure Files</h3>
<p>A file share mounted over SMB can authenticate users with Kerberos, so that people keep their usual identities and Windows permissions. One identity source per storage account:</p>
<div class="tabla"><table>
<thead><tr><th>Identity source</th><th>Use it when</th></tr></thead>
<tbody>
<tr><td><strong>On-premises Active Directory Domain Services</strong></td><td>You have domain controllers and clients that can reach them. Identities must be synchronised to Entra ID</td></tr>
<tr><td><strong>Microsoft Entra Domain Services</strong></td><td>You want a managed domain in Azure and no domain controllers of your own</td></tr>
<tr><td><strong>Microsoft Entra Kerberos</strong></td><td>Clients are Entra joined or hybrid joined and cannot reach a domain controller</td></tr>
</tbody></table></div>
<p>Permissions are checked at two levels, and the user needs both:</p>
<ol>
<li><strong>Share level,</strong> with Azure roles: <em>Storage File Data SMB Share Reader</em> (read), <em>Contributor</em> (read, write, delete) and <em>Elevated Contributor</em> (the same, plus changing NTFS permissions).</li>
<li><strong>File and directory level,</strong> with ordinary Windows NTFS permissions.</li>
</ol>
<p>Other facts: SMB uses TCP port <strong>445</strong>, which many internet providers block outbound. Mounting with the storage account key always works and gives full control, which is why it is kept for administrators. Identity-based authentication does not apply to NFS shares.</p>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 5. Keys, SAS, policies and the firewall</h3>
<p>This follows the middle part of the official Lab 07. Cost: a few cents.</p>
<h3>Part A. A SAS that expires</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab05</code> and a Standard LRS storage account. Create a private container <code>docs</code> and upload a small text file.</li>
<li>Copy the URL of the blob and open it in a private browser window. Read the error: ResourceNotFound or PublicAccessNotPermitted.</li>
<li>On the blob, choose <strong>Generate SAS</strong>. Signing method Account key, permission Read, expiry in 5 minutes. Open the Blob SAS URL in the private window. It works.</li>
<li>Read the query string and identify sp, st, se and sig. Wait until it expires and reload.</li>
</ol>
<h3>Part B. A stored access policy</h3>
<ol>
<li>On the container, open <strong>Access policy</strong> and add a stored access policy named <code>read-1day</code> with Read permission and an expiry tomorrow.</li>
<li>Generate a new SAS for the blob and select that policy. Notice that the permission and expiry fields disappear, and that the URL now contains <code>si=read-1day</code>.</li>
<li>Check that the URL works. Delete the policy, wait half a minute and reload.</li>
</ol>
<h3>Part C. Rotate a key</h3>
<ol>
<li>Generate another ad hoc SAS signed with key1 and confirm that it works.</li>
<li>Open <strong>Access keys</strong> and rotate key1. Reload the SAS URL.</li>
</ol>
<h3>Part D. The firewall</h3>
<ol>
<li>Open <strong>Networking</strong>. Select Enabled from selected virtual networks and IP addresses, add no rule and save.</li>
<li>Try to open the container in the portal. You are blocked, even though you are the Owner.</li>
<li>Tick Add your client IP address, save and try again.</li>
</ol>
<h3>Part E. The command line</h3>
<div class="tabla"><pre>az storage account keys list --account-name UNIQUENAME --resource-group rg-az104-lab05 --output table
az storage account keys renew --account-name UNIQUENAME --resource-group rg-az104-lab05 --key key2
az storage container generate-sas --account-name UNIQUENAME --name docs --permissions rl --expiry 2026-12-31T00:00Z --auth-mode login --as-user
az storage account update --name UNIQUENAME --resource-group rg-az104-lab05 --default-action Deny</pre></div>
<p>The third command creates a user delegation SAS: <code>--auth-mode login --as-user</code> signs it with your Entra identity and no account key. It needs a Storage Blob Data role, and an expiry within seven days, so change the date.</p>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab5", label: "The error text for an expired SAS, for a deleted policy, and for a request blocked by the firewall" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Ad hoc SAS generated, read and left to expire." },
        { id: "t2", texto: "SAS tied to a stored access policy, then revoked by deleting the policy." },
        { id: "t3", texto: "Key rotated and its SAS tokens invalidated." },
        { id: "t4", texto: "Firewall set to selected networks and client IP allowed." },
        { id: "t5", texto: "User delegation SAS created with the CLI." },
        { id: "t6", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Which credential",
        enunciado: R`<p>A storage account holds invoices in a private blob container.</p>`,
        partes: [
          { id: "a", pregunta: "An external auditor needs read access to one container for three days. You must not share account keys, and the access must be signed with Microsoft Entra credentials. What do you provide?", tipo: "opcion", respuesta: 2,
            opciones: ["Key2 of the storage account", "An account SAS", "A user delegation SAS", "The Reader role on the storage account"],
            pistas: ["Only one SAS type is not signed with an account key.", "Reader is a control plane role."],
            solucion: R`A user delegation SAS is signed with a key obtained through Entra ID, and three days is within its seven-day limit. Account and service SAS tokens are signed with an account key.` },
          { id: "b", pregunta: "Which SAS type can grant access to both the Blob service and the File service with a single token?", tipo: "opcion", respuesta: 0,
            opciones: ["Account SAS", "Service SAS", "User delegation SAS", "None"],
            pistas: ["A service SAS covers one service."],
            solucion: R`An account SAS can span several services.` },
          { id: "c", pregunta: "An application uses key1. You must rotate keys with no downtime. What is the correct order?", tipo: "opcion", respuesta: 3,
            opciones: ["Regenerate key1, then update the application", "Regenerate key1 and key2 together, then update the application", "Disable key access, then regenerate key1", "Switch the application to key2, then regenerate key1"],
            pistas: ["Why does Azure give you two keys?"],
            solucion: R`Move the application to the second key first. Then the first can be regenerated without affecting anything.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Revoking access",
        enunciado: R`<p>Last month you issued 40 service SAS tokens for the container named partners. Twenty of them were created with their own permissions and expiry. The other twenty refer to a stored access policy named Policy1. All were signed with key1. All expire in six months.</p>`,
        partes: [
          { id: "a", pregunta: "One partner linked to Policy1 leaves, and all twenty tokens under Policy1 must stop working today. The other twenty must keep working. What do you do?", tipo: "opcion", respuesta: 1,
            opciones: ["Regenerate key1", "Delete Policy1", "Regenerate key2", "Set the container to private"],
            pistas: ["Regenerating key1 affects everything signed with it."],
            solucion: R`Deleting or changing the stored access policy invalidates only the tokens that refer to it. Regenerating key1 would break all forty.` },
          { id: "b", pregunta: "A single ad hoc SAS, not linked to any policy, has leaked. What is the only way to invalidate it before it expires?", tipo: "opcion", respuesta: 0,
            opciones: ["Regenerate the key that signed it", "Delete it from the list of SAS tokens in the portal", "Create a stored access policy with the same name", "Change the redundancy of the account"],
            pistas: ["Does Azure keep a list of issued SAS tokens?"],
            solucion: R`Azure does not track ad hoc SAS tokens. Regenerating the signing key is the only option, and it invalidates every other SAS signed with that key. This is the argument for stored access policies.` },
          { id: "c", pregunta: "How many stored access policies can one container have?", tipo: "opcion", respuesta: 1,
            opciones: ["1", "5", "50", "Unlimited"],
            pistas: ["A small fixed number."],
            solucion: R`Five per container, file share, queue or table.` }
        ] },
      { id: "q3", nivel: 2, titulo: "The firewall",
        enunciado: R`<p>A storage account is set to Enabled from selected virtual networks and IP addresses. Virtual machines in subnet Subnet1 of VNet1 must reach it. So must the head office, which goes out to the internet through the public address 198.51.100.20 and uses 10.20.0.0/16 internally.</p>`,
        partes: [
          { id: "a", pregunta: "What must be configured on Subnet1 before it can be added as a virtual network rule?", tipo: "opcion", respuesta: 2,
            opciones: ["A NAT gateway", "A route table", "The Microsoft.Storage service endpoint", "A network security group"],
            pistas: ["The storage account must be able to recognise the subnet as the source."],
            solucion: R`A service endpoint for Microsoft.Storage. It makes traffic from the subnet arrive with the identity of the virtual network and subnet.` },
          { id: "b", pregunta: "Which IP rule allows the head office?", tipo: "opcion", respuesta: 0,
            opciones: ["198.51.100.20", "10.20.0.0/16", "Both are needed", "0.0.0.0/0"],
            pistas: ["Which source address does the storage service actually see?"],
            solucion: R`The public address. Private ranges cannot be used in IP rules, because traffic from the office arrives after NAT.` },
          { id: "c", pregunta: "A user at home has a valid, unexpired SAS for a blob in this account and receives a 403 error. Why?", tipo: "opcion", respuesta: 1,
            opciones: ["A SAS cannot be used outside Azure", "The request is blocked by the firewall before the SAS is considered sufficient", "The SAS must be regenerated every hour", "The user needs the Reader role as well"],
            pistas: ["Two independent checks: network and credential."],
            solucion: R`Both checks must pass. The home address is not in the allowed list.` },
          { id: "d", pregunta: "After the firewall was enabled, Azure Backup can no longer use the account. Which setting restores it with the least exposure?", tipo: "opcion", respuesta: 3,
            opciones: ["Enabled from all networks", "An IP rule for 0.0.0.0/0", "Allow Blob anonymous access", "Allow trusted Microsoft services to access this storage account"],
            pistas: ["It is listed under Exceptions."],
            solucion: R`The trusted Microsoft services exception lets specific first-party services through without opening the account to everyone.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Azure Files with identities",
        enunciado: R`<p>Contoso has an on-premises Active Directory domain synchronised to Microsoft Entra ID. Users in the office must map a drive to an Azure file share with their domain credentials. Group1 must be able to read, write and delete files. Nobody in Group1 may change permissions.</p>`,
        partes: [
          { id: "a", pregunta: "Which identity source do you enable on the storage account?", tipo: "opcion", respuesta: 0,
            opciones: ["On-premises Active Directory Domain Services", "Shared access signatures", "Microsoft Entra B2B", "Access keys"],
            pistas: ["The users already authenticate against domain controllers they can reach."],
            solucion: R`On-premises AD DS authentication. The clients reach their domain controllers and the identities are already synchronised.` },
          { id: "b", pregunta: "Which share-level role do you assign to Group1?", tipo: "opcion", respuesta: 1,
            opciones: ["Storage File Data SMB Share Reader", "Storage File Data SMB Share Contributor", "Storage File Data SMB Share Elevated Contributor", "Storage Account Contributor"],
            pistas: ["Elevated adds the right to change NTFS permissions."],
            solucion: R`Contributor allows read, write and delete. Elevated Contributor would also allow changing permissions, which is forbidden here. Storage Account Contributor is a control plane role.` },
          { id: "c", pregunta: "A user at home cannot map the share, and a test shows that the connection is not even established. Which port is most likely blocked by the internet provider?", tipo: "opcion", respuesta: 2,
            opciones: ["TCP 443", "TCP 3389", "TCP 445", "UDP 53"],
            pistas: ["It is the SMB port."],
            solucion: R`SMB uses TCP 445, which many providers block. The usual solutions are a VPN or a private endpoint reached over a private connection.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Preference order:</strong> Entra ID with data roles, then user delegation SAS, then service or account SAS, and account keys last.`,
      R`<strong>Two keys</strong> so that you can rotate. Regenerating a key kills every SAS signed with it.`,
      R`<strong>User delegation SAS:</strong> Entra-signed, Blob, at most 7 days. <strong>Service SAS:</strong> one service. <strong>Account SAS:</strong> several services.`,
      R`<strong>Stored access policy:</strong> on the container, five at most, service SAS only. Edit or delete it to change or revoke its tokens.`,
      R`<strong>Firewall:</strong> all networks, selected networks (subnets with a service endpoint, public IPs, trusted services) or disabled with private endpoints. Network and credential must both pass.`,
      R`<strong>Azure Files over SMB:</strong> AD DS, Entra Domain Services or Entra Kerberos. Share-level role plus NTFS permissions. Port 445.`
    ] }
  ]
});

/* ───────────────────────── LESSON 7 ───────────────────────── */
LESSONS.push({
  id: "az-7", n: 7, fase: 2, codigo: "Blob and Files",
  titulo: "Blob Storage and Azure Files",
  sub: "Containers, access tiers and lifecycle rules, and the protections against deleting or overwriting the wrong thing.",
  horas: "4 hours",
  contexto: "Blob Storage: containers, block, append and page blobs. Access tiers hot, cool (30 days minimum), cold (90 days), archive (180 days, offline, rehydration up to 15 hours with standard or high priority); account default tier hot, cool or cold; early deletion charge. Lifecycle management rules: filters and actions on base blobs, versions and snapshots, based on days since modification, creation or last access; run once a day. Data protection: blob versioning, blob snapshots, soft delete for blobs and for containers, point-in-time restore, immutability. Azure Files: SMB and NFS, tiers premium, transaction optimised, hot and cool, quotas, mounting, share snapshots (up to 200, read-only, incremental), soft delete for file shares, Azure File Sync in outline.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">Blob Storage is for objects that applications read and write over HTTPS: images, logs, backups, video. Azure Files is for folders that people and servers mount as a network drive. The first decision in most storage questions is simply which of the two the scenario describes.</p>
<p>The second decision is about money and time. Data that nobody has opened for a year does not deserve the same price per gigabyte as data read every minute. <strong>Access tiers</strong> let you pay less to store in exchange for paying more, and waiting longer, to read. <strong>Lifecycle management</strong> moves blobs between tiers automatically as they age.</p>
<p>The third is about mistakes. Four features protect against deleting or overwriting data by accident, and the exam expects you to tell them apart: versioning, snapshots, soft delete and point-in-time restore.</p>
<div class="nota"><strong>An analogy for the tiers.</strong> Hot is the shelf next to your desk. Cool and cold are the archive room down the corridor: cheaper space, a small charge each time you fetch something. Archive is the warehouse in another town: almost free to keep, but you order the box and wait hours for it to arrive.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Containers and blobs</h3>
<ul>
<li>A <strong>container</strong> groups blobs, like a top-level folder. Names are lowercase, 3 to 63 characters.</li>
<li><strong>Block blobs</strong> hold ordinary files. <strong>Append blobs</strong> are for data that only grows, such as logs. <strong>Page blobs</strong> hold random-access data, and are what unmanaged virtual machine disks used.</li>
<li>Folders inside a container are an illusion created by slashes in blob names, unless the account has a hierarchical namespace, which is Data Lake Storage.</li>
<li>Anonymous access level of a container: <em>Private</em>, <em>Blob</em> (anyone can read a blob if they know its URL) or <em>Container</em> (anyone can also list the blobs). The last two are possible only when the account allows anonymous access.</li>
</ul>

<h3>2. Access tiers</h3>
<div class="tabla"><table>
<thead><tr><th>Tier</th><th>For data that is</th><th>Minimum stay</th><th>Readable at once</th><th>Can be the account default</th></tr></thead>
<tbody>
<tr><td><strong>Hot</strong></td><td>Used often</td><td>None</td><td>Yes</td><td>Yes</td></tr>
<tr><td><strong>Cool</strong></td><td>Used rarely</td><td>30 days</td><td>Yes</td><td>Yes</td></tr>
<tr><td><strong>Cold</strong></td><td>Used very rarely</td><td>90 days</td><td>Yes</td><td>Yes</td></tr>
<tr><td><strong>Archive</strong></td><td>Kept for compliance, almost never read</td><td>180 days</td><td>No. It is offline</td><td>No. Set per blob only</td></tr>
</tbody></table></div>
<ul>
<li>Storage price falls from hot to archive. Access price rises.</li>
<li>Deleting or moving a blob before its minimum stay incurs an <strong>early deletion charge</strong> for the remaining days.</li>
<li>A blob without an explicit tier takes the account default.</li>
<li>An archived blob cannot be read or modified. To use it you <strong>rehydrate</strong> it, either by changing its tier to hot, cool or cold or by copying it to a new blob in an online tier. Standard priority can take up to 15 hours. High priority is faster for small blobs and costs more.</li>
<li>Tiers exist only in Standard accounts, for block blobs. Archive is not offered with ZRS, GZRS or RA-GZRS.</li>
</ul>

<h3>3. Lifecycle management</h3>
<p>A lifecycle policy is a set of rules. Each rule has a <strong>filter</strong> (blob type, name prefix, blob index tags) and <strong>actions</strong> with conditions.</p>
<div class="tabla"><pre>{
  "rules": [{
    "name": "age-out-logs",
    "enabled": true,
    "type": "Lifecycle",
    "definition": {
      "filters": { "blobTypes": ["blockBlob"], "prefixMatch": ["logs/"] },
      "actions": {
        "baseBlob": {
          "tierToCool":    { "daysAfterModificationGreaterThan": 30 },
          "tierToArchive": { "daysAfterModificationGreaterThan": 180 },
          "delete":        { "daysAfterModificationGreaterThan": 2555 }
        },
        "snapshot": { "delete": { "daysAfterCreationGreaterThan": 90 } },
        "version":  { "delete": { "daysAfterCreationGreaterThan": 90 } }
      }
    }
  }]
}</pre></div>
<ul>
<li>Actions: <code>tierToCool</code>, <code>tierToCold</code>, <code>tierToArchive</code>, <code>delete</code>.</li>
<li>Conditions: days since last modification, since creation, or since last access. The last one needs access time tracking to be enabled.</li>
<li>Rules can act on the current blob, on previous versions and on snapshots separately.</li>
<li>The policy runs about once a day. A new or changed rule can take up to 24 hours to start, and the work itself can take longer. It is never instant.</li>
<li>If several actions apply to the same blob, the cheapest wins: delete, then archive, then cold, then cool.</li>
<li>The prefix starts with the container name: <code>logs/2025/</code> means container logs, names starting with 2025/.</li>
</ul>

<h3>4. Protecting blob data</h3>
<div class="tabla"><table>
<thead><tr><th>Feature</th><th>What it does</th><th>Recovers from</th></tr></thead>
<tbody>
<tr><td><strong>Versioning</strong></td><td>Keeps the previous state automatically every time a blob is overwritten or deleted. Each version has an ID</td><td>Overwrite and delete of a blob</td></tr>
<tr><td><strong>Snapshot</strong></td><td>A read-only copy of a blob at one moment, taken by hand or by an application</td><td>Whatever you snapshotted before</td></tr>
<tr><td><strong>Blob soft delete</strong></td><td>Keeps deleted blobs, versions and snapshots for 1 to 365 days</td><td>Delete of a blob, version or snapshot</td></tr>
<tr><td><strong>Container soft delete</strong></td><td>Keeps deleted containers for 1 to 365 days</td><td>Delete of a whole container</td></tr>
<tr><td><strong>Point-in-time restore</strong></td><td>Returns block blobs in chosen containers to their state at an earlier moment</td><td>Widespread corruption or bulk mistakes</td></tr>
<tr><td><strong>Immutability</strong></td><td>Write once, read many: nobody can modify or delete until a retention period ends or a legal hold is lifted</td><td>Nothing. It prevents</td></tr>
</tbody></table></div>
<ul>
<li>Versioning is automatic. Snapshots are manual. That is the usual difference a question turns on.</li>
<li>To restore a previous version you make it the current version. The older versions stay.</li>
<li>Blob soft delete does not protect against deleting the container. That needs container soft delete.</li>
<li>Point-in-time restore requires versioning, the change feed and blob soft delete to be enabled.</li>
<li>None of these protects against deleting the storage account. A CanNotDelete lock does.</li>
<li>Versions and snapshots are billed. Combine versioning with a lifecycle rule that deletes old versions.</li>
</ul>

<h3>5. Azure Files</h3>
<ul>
<li>Fully managed file shares over <strong>SMB</strong>, for Windows, Linux and macOS, or <strong>NFS 4.1</strong>, for Linux. NFS needs a Premium file shares account and has no identity-based authentication, so it is protected by network rules.</li>
<li>Tiers: <strong>Premium</strong> on SSD, and on Standard accounts <strong>Transaction optimised</strong>, <strong>Hot</strong> and <strong>Cool</strong>. There is no archive tier for files.</li>
<li>A share has a <strong>quota</strong>, its maximum size.</li>
<li>The portal's <strong>Connect</strong> button produces the mount script for each operating system. It uses the storage account key unless identity-based access is configured.</li>
</ul>
<div class="tabla"><pre>net use Z: \\ACCOUNT.file.core.windows.net\share1 /user:Azure\ACCOUNT KEY

sudo mount -t cifs //ACCOUNT.file.core.windows.net/share1 /mnt/share1 -o username=ACCOUNT,password=KEY,serverino</pre></div>

<h3>6. Protecting file shares</h3>
<ul>
<li>A <strong>share snapshot</strong> captures the whole share at one moment. It is read-only and incremental, so it stores only what changed. Up to 200 per share.</li>
<li>Users on Windows can restore a single file from a snapshot through the <strong>Previous versions</strong> tab, without an administrator.</li>
<li>A share that has snapshots cannot be deleted until its snapshots are deleted, unless you choose to delete them together.</li>
<li><strong>Soft delete for file shares</strong> keeps a deleted share, with its snapshots, for 1 to 365 days. It protects the share as a whole, not individual files.</li>
<li>Snapshots live in the same account as the share. For protection against losing the account, Azure Backup can manage share snapshots and copy data to a vault, as you will see in lesson 17.</li>
</ul>

<h3>7. Azure File Sync, in two lines</h3>
<p>Azure File Sync keeps an on-premises Windows file server synchronised with an Azure file share, and with cloud tiering it leaves only the most used files on the local disk. The pieces are a Storage Sync Service, a sync group, one cloud endpoint and one or more server endpoints. It is not in the current skills outline, but it appears as a wrong answer often enough to be worth recognising.</p>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 6. Tiers, lifecycle, versions and a file share</h3>
<p>This follows the last part of the official Lab 07. Cost: a few cents. Delete the group at the end, because versions and snapshots are billed.</p>
<h3>Part A. Tiers</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab06</code> and a Standard LRS account. Under <strong>Configuration</strong>, find the default access tier.</li>
<li>Create a container <code>data</code> and upload three small files. On upload, open Advanced and set a different tier for each: hot, cool and archive.</li>
<li>Try to download the archived blob and read the message. Use <strong>Change tier</strong> to move it to hot, with standard priority, and look at the Archive status property.</li>
</ol>
<h3>Part B. A lifecycle rule</h3>
<ol>
<li>Open <strong>Lifecycle management</strong> and add a rule that moves block blobs with the prefix <code>data/</code> to cool 30 days after modification and deletes them after 365.</li>
<li>Switch to Code view and compare the JSON with the example in this lesson.</li>
</ol>
<h3>Part C. Versioning and soft delete</h3>
<ol>
<li>Open <strong>Data protection</strong>. Enable versioning, blob soft delete for 7 days and container soft delete for 7 days.</li>
<li>Upload a text file. Edit it in the portal and save twice. Open the <strong>Versions</strong> tab of the blob and make the first version current.</li>
<li>Delete the blob. In the container, switch on Show deleted blobs and undelete it.</li>
<li>Delete the container, switch on Show deleted containers and restore it.</li>
</ol>
<h3>Part D. A file share</h3>
<ol>
<li>Create a file share <code>share1</code> in the transaction optimised tier. Upload a file.</li>
<li>Press <strong>Connect</strong> and read the scripts for Windows and Linux. You do not need to run them.</li>
<li>Create a snapshot. Change the file, then browse the snapshot and restore the earlier copy.</li>
<li>Try to delete the share and read the warning about snapshots.</li>
</ol>
<h3>Part E. The command line</h3>
<div class="tabla"><pre>az storage blob set-tier --account-name UNIQUENAME --container-name data --name FILE --tier Cool --auth-mode login
az storage account blob-service-properties update --account-name UNIQUENAME --resource-group rg-az104-lab06 --enable-versioning true
az storage account management-policy show --account-name UNIQUENAME --resource-group rg-az104-lab06
az storage share-rm create --storage-account UNIQUENAME --resource-group rg-az104-lab06 --name share2 --quota 5</pre></div>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab6", label: "The message when downloading an archived blob, and what the Versions tab shows after two edits" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Blobs uploaded in three tiers and one rehydration started." },
        { id: "t2", texto: "Lifecycle rule created and read as JSON." },
        { id: "t3", texto: "Previous version restored." },
        { id: "t4", texto: "Blob and container undeleted." },
        { id: "t5", texto: "File share created, snapshot taken and a file restored from it." },
        { id: "t6", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Tiers",
        enunciado: R`<p>A Standard general-purpose v2 account with LRS stores block blobs for three applications.</p>`,
        partes: [
          { id: "a", pregunta: "Compliance records must be kept for seven years at the lowest storage cost. If one is ever needed, a wait of several hours is acceptable. Which tier?", tipo: "opcion", respuesta: 3,
            opciones: ["Hot", "Cool", "Cold", "Archive"],
            pistas: ["Lowest storage cost, and a delay to read is acceptable."],
            solucion: R`Archive is the cheapest to store, and the data is offline until rehydrated, which fits a tolerance of hours.` },
          { id: "b", pregunta: "Backups are read perhaps twice a year, but when they are needed they must be readable immediately. Lowest cost?", tipo: "opcion", respuesta: 2,
            opciones: ["Hot", "Cool", "Cold", "Archive"],
            pistas: ["Immediately rules out one tier.", "Among the online tiers, which is cheapest to store?"],
            solucion: R`Cold is an online tier, readable at once, and cheaper to store than cool. Archive would mean hours of waiting.` },
          { id: "c", pregunta: "An administrator tries to open a blob in the archive tier and gets an error. What must be done first?", tipo: "opcion", respuesta: 1,
            opciones: ["Generate a SAS token", "Rehydrate the blob to an online tier", "Enable versioning", "Change the account to Premium"],
            pistas: ["Archived blobs are offline."],
            solucion: R`Rehydrate it, by changing its tier or by copying it to a blob in an online tier. With standard priority this can take up to 15 hours.` },
          { id: "d", pregunta: "A blob is moved to the cool tier and deleted 10 days later. What happens to the bill?", tipo: "opcion", respuesta: 0,
            opciones: ["An early deletion charge is applied for the remaining 20 days", "Nothing. Billing stops at deletion", "The deletion is refused until day 30", "The blob is moved back to hot"],
            pistas: ["Cool has a minimum stay of 30 days."],
            solucion: R`An early deletion charge, prorated for the days missing up to 30. The deletion itself is allowed.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Lifecycle management",
        enunciado: R`<p>You add this lifecycle rule to an account at 10:00 on Monday.</p>
<div class="tabla"><pre>"filters": { "blobTypes": ["blockBlob"], "prefixMatch": ["reports/2024"] },
"actions": { "baseBlob": {
    "tierToCool":    { "daysAfterModificationGreaterThan": 30 },
    "tierToArchive": { "daysAfterModificationGreaterThan": 90 },
    "delete":        { "daysAfterModificationGreaterThan": 365 } } }</pre></div>`,
        partes: [
          { id: "a", pregunta: "Which blob does the rule apply to?", tipo: "opcion", respuesta: 1,
            opciones: ["A blob named reports/2024/q1.pdf in the container named data", "A blob named 2024/q1.pdf in the container named reports", "A page blob named 2024.vhd in the container named reports", "Every blob in the account modified in 2024"],
            pistas: ["The prefix begins with the container name.", "Check the blob type as well."],
            solucion: R`The prefix is container name, slash, start of the blob name. So it matches block blobs in the container reports whose names start with 2024.` },
          { id: "b", pregunta: "A matching blob was last modified 400 days ago. What does the rule do to it?", tipo: "opcion", respuesta: 2,
            opciones: ["Moves it to cool", "Moves it to archive", "Deletes it", "Moves it to cool, then archive, then deletes it, on three consecutive days"],
            pistas: ["All three conditions are true. Which action wins?"],
            solucion: R`When several actions apply, the least expensive one is taken, and delete comes first.` },
          { id: "c", pregunta: "At 10:30 on Monday you check and nothing has moved. Why?", tipo: "opcion", respuesta: 0,
            opciones: ["The policy can take up to 24 hours to take effect", "Lifecycle rules need versioning enabled", "The rule is missing a SAS token", "Lifecycle management only works on Premium accounts"],
            pistas: ["How often does the lifecycle engine run?"],
            solucion: R`The engine runs about once a day, and a new policy can take up to 24 hours to start.` },
          { id: "d", pregunta: "You want blobs to move to cool when they have not been read for 60 days, whenever they were written. Which TWO things do you need? Select two.", tipo: "multi", respuesta: [1, 2],
            opciones: ["The condition daysAfterCreationGreaterThan", "The condition daysAfterLastAccessTimeGreaterThan", "Access time tracking enabled on the account", "Blob index tags on every blob"],
            pistas: ["Read means access, and Azure does not record access times by default."],
            solucion: R`The last access condition, and access tracking, which has to be switched on for Azure to record when blobs are read.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Recovering data",
        enunciado: R`<p>An account has blob soft delete enabled with 14 days of retention. Versioning and container soft delete are disabled.</p>`,
        partes: [
          { id: "a", pregunta: "A user overwrites a blob with wrong content. What is kept?", tipo: "opcion", respuesta: 0,
            opciones: ["A soft-deleted snapshot of the previous content, for 14 days", "A numbered version that stays until someone deletes it", "Nothing", "A copy in the paired region"],
            pistas: ["Without versioning, how does soft delete handle an overwrite?"],
            solucion: R`With soft delete alone, an overwrite creates a soft-deleted snapshot of the earlier state, kept for the retention period. With versioning it would be a version kept indefinitely.` },
          { id: "b", pregunta: "A script deletes the whole container. Can the data be recovered?", tipo: "opcion", respuesta: 1,
            opciones: ["Yes, for 14 days, through blob soft delete", "No, because container soft delete is not enabled", "Yes, through the Previous versions tab", "Yes, by rehydrating"],
            pistas: ["Blob soft delete and container soft delete are separate switches."],
            solucion: R`Blob soft delete protects blobs, not containers. Deleting a container removes everything in it unless container soft delete is on.` },
          { id: "c", pregunta: "You must be able to return all block blobs in a container to their state at 09:00 yesterday. Which feature, and what does it require?", tipo: "opcion", respuesta: 3,
            opciones: ["Snapshots, which need nothing else", "Object replication, which needs a second account", "Lifecycle management, which needs access tracking", "Point-in-time restore, which needs versioning, change feed and soft delete"],
            pistas: ["One feature restores many blobs to a moment in time."],
            solucion: R`Point-in-time restore for block blobs. It depends on versioning, the change feed and blob soft delete.` },
          { id: "d", pregunta: "Audit files must be impossible to modify or delete for five years, even by administrators. What do you configure?", tipo: "opcion", respuesta: 2,
            opciones: ["A ReadOnly resource lock", "The archive tier", "An immutability policy with time-based retention", "Blob soft delete with 365 days"],
            pistas: ["Locks act on the control plane, and an Owner can remove them."],
            solucion: R`Immutable storage with a time-based retention policy. A resource lock does not stop data operations and can be removed by an Owner.` }
        ] },
      { id: "q4", nivel: 3, titulo: "File shares",
        enunciado: R`<p>A Standard account contains a file share named projects, mounted by 50 Windows users. A snapshot of the share is taken every night.</p>`,
        partes: [
          { id: "a", pregunta: "A user deletes a spreadsheet by mistake. What is the simplest way to get it back?", tipo: "opcion", respuesta: 1,
            opciones: ["Restore the whole share from soft delete", "The user opens Previous versions on the folder and restores the file", "An administrator fails over the storage account", "Change the tier of the share to hot"],
            pistas: ["Share snapshots integrate with a Windows feature."],
            solucion: R`Share snapshots appear in the Previous versions tab on Windows, so a user can restore a single file. Soft delete for shares only helps when the share itself was deleted.` },
          { id: "b", pregunta: "An administrator tries to delete the share and the operation is refused. Why?", tipo: "opcion", respuesta: 0,
            opciones: ["The share has snapshots", "The share is in the hot tier", "Users have it mounted", "Shares can only be deleted with AzCopy"],
            pistas: ["What exists besides the share itself?"],
            solucion: R`A share with snapshots cannot be deleted unless the snapshots are deleted with it.` },
          { id: "c", pregunta: "Linux servers must mount a share with NFS 4.1. Which TWO statements are true? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["The share must be in a Premium file shares account", "The share must be in the cool tier", "Users authenticate with Microsoft Entra Kerberos", "Access is restricted with network rules, not with user identities"],
            pistas: ["NFS on Azure Files is a premium-only feature.", "Identity-based authentication is an SMB feature."],
            solucion: R`NFS shares exist only in Premium file shares accounts, and they are secured at network level, with private endpoints or virtual network rules.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Tiers:</strong> hot, cool (30 days), cold (90), archive (180, offline). Account default can be hot, cool or cold. Archive is per blob and must be rehydrated, up to 15 hours.`,
      R`<strong>Lifecycle rules</strong> filter by blob type and prefix, starting with the container name. They run daily, take up to 24 hours to start, and the cheapest action wins.`,
      R`<strong>Versioning</strong> is automatic. <strong>Snapshots</strong> are manual. <strong>Soft delete</strong> keeps deleted items for 1 to 365 days, with separate switches for blobs, containers and file shares.`,
      R`<strong>Point-in-time restore</strong> needs versioning, change feed and soft delete. <strong>Immutability</strong> stops even administrators.`,
      R`<strong>Azure Files:</strong> SMB or NFS (Premium only). Tiers premium, transaction optimised, hot, cool. No archive.`,
      R`<strong>Share snapshots:</strong> read-only, incremental, 200 at most, restore single files through Previous versions. A share with snapshots cannot be deleted on its own.`
    ] }
  ]
});


LESSONS.push({
  id: "az-8", n: 8, fase: 3, codigo: "ARM and Bicep",
  titulo: "ARM templates and Bicep",
  sub: "Describe the infrastructure in a file and let Azure build it. Read a template, change it, deploy it and export one from what already exists.",
  horas: "4 hours",
  contexto: "Infrastructure as code in Azure. ARM template JSON structure: $schema, contentVersion, parameters, variables, functions, resources, outputs. Bicep: param, var, resource, module, output, existing, decorators, implicit dependencies. Deployment scopes (resource group, subscription, management group, tenant), deployment modes (incremental default, complete), what-if, parameter files, dependsOn, copy loops, conditions. Commands: az deployment group create, New-AzResourceGroupDeployment, az bicep build and decompile. Export template from a resource, a resource group or the deployment history. Official Lab 03.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">Clicking through the portal works for one virtual machine. It does not work for fifty, and it leaves no record of what you chose. A template is a text file that states what should exist. You hand it to Azure Resource Manager, and Resource Manager works out which calls to make.</p>
<p>The key word is <strong>declarative</strong>. A script says <em>do this, then this</em>. A template says <em>this is the end state</em>. Deploy the same template twice and the second run changes nothing, because the end state is already there. That property is called <strong>idempotence</strong>.</p>
<p>Azure has two languages for the same thing. <strong>ARM templates</strong> are JSON: verbose, but they are what Resource Manager actually receives. <strong>Bicep</strong> is a shorter language that is converted to that JSON before deployment. The exam shows both and asks you to read them, change a value, and pick the command that deploys them.</p>
<div class="nota"><strong>An analogy from your field.</strong> A template is to Azure what a saved configuration file is to a router. You do not retype the commands on each device. You keep the file in version control, change one line, and push it. And like a good configuration push, it only touches what differs.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. The anatomy of an ARM template</h3>
<div class="tabla"><pre>{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageName": { "type": "string", "minLength": 3, "maxLength": 24 },
    "sku": {
      "type": "string",
      "defaultValue": "Standard_LRS",
      "allowedValues": [ "Standard_LRS", "Standard_GRS" ]
    }
  },
  "variables": {
    "location": "[resourceGroup().location]"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2023-05-01",
      "name": "[parameters('storageName')]",
      "location": "[variables('location')]",
      "sku": { "name": "[parameters('sku')]" },
      "kind": "StorageV2"
    }
  ],
  "outputs": {
    "blobEndpoint": {
      "type": "string",
      "value": "[reference(parameters('storageName')).primaryEndpoints.blob]"
    }
  }
}</pre></div>
<div class="tabla"><table>
<thead><tr><th>Element</th><th>Required</th><th>What it holds</th></tr></thead>
<tbody>
<tr><td><code>$schema</code></td><td>Yes</td><td>The version of the template language. It also tells you the scope the template is written for</td></tr>
<tr><td><code>contentVersion</code></td><td>Yes</td><td>Your own version number for the file</td></tr>
<tr><td><code>parameters</code></td><td>No</td><td>Values supplied at deployment time</td></tr>
<tr><td><code>variables</code></td><td>No</td><td>Values computed once and reused inside the template</td></tr>
<tr><td><code>functions</code></td><td>No</td><td>Your own functions</td></tr>
<tr><td><code>resources</code></td><td>Yes</td><td>What to deploy or update</td></tr>
<tr><td><code>outputs</code></td><td>No</td><td>Values returned after the deployment</td></tr>
</tbody></table></div>
<ul>
<li>Anything inside square brackets is an <strong>expression</strong> evaluated at deployment: <code>[parameters('x')]</code>, <code>[variables('y')]</code>, <code>[resourceGroup().location]</code>, <code>[concat('a', 'b')]</code>, <code>[uniqueString(resourceGroup().id)]</code>, <code>[resourceId(...)]</code>.</li>
<li>Every resource needs <code>type</code>, <code>apiVersion</code> and <code>name</code>. Most also need <code>location</code>.</li>
<li>Parameter types: <code>string</code>, <code>securestring</code>, <code>int</code>, <code>bool</code>, <code>object</code>, <code>secureObject</code>, <code>array</code>. A <code>securestring</code> is not stored in the deployment history, so it is the type for passwords.</li>
<li>A parameter with no <code>defaultValue</code> must be supplied, or the deployment asks for it.</li>
</ul>

<h3>2. Order, loops and conditions</h3>
<ul>
<li>Resource Manager deploys resources in parallel when it can. <code>dependsOn</code> forces an order: a network interface that depends on a virtual network waits for it.</li>
<li>The <code>reference()</code> function creates an implicit dependency on a resource in the same template.</li>
<li><code>copy</code> creates several instances of a resource, with <code>copyIndex()</code> giving the number of each.</li>
<li><code>condition</code> deploys a resource only when an expression is true.</li>
</ul>

<h3>3. The same thing in Bicep</h3>
<div class="tabla"><pre>param storageName string
param location string = resourceGroup().location

@allowed([
  'Standard_LRS'
  'Standard_GRS'
])
param sku string = 'Standard_LRS'

resource st 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageName
  location: location
  sku: {
    name: sku
  }
  kind: 'StorageV2'
}

output blobEndpoint string = st.properties.primaryEndpoints.blob</pre></div>
<ul>
<li>Keywords: <code>param</code>, <code>var</code>, <code>resource</code>, <code>module</code>, <code>output</code>. Decorators such as <code>@allowed</code>, <code>@minLength</code>, <code>@secure()</code> and <code>@description</code> go on the line above.</li>
<li>The resource line is <em>symbolic name</em>, then <em>type@apiVersion</em>. The symbolic name, here <code>st</code>, exists only inside the file. The real name is the <code>name</code> property.</li>
<li>Referring to another resource by its symbolic name creates the dependency automatically, so <code>dependsOn</code> is rarely written in Bicep.</li>
<li><code>existing</code> refers to a resource that is already deployed, without redeploying it.</li>
<li>A <strong>module</strong> is another Bicep file used as a building block.</li>
<li>Bicep has no state file. Like JSON templates, it relies on Azure itself as the record of what exists.</li>
</ul>

<h3>4. Deploying</h3>
<div class="tabla"><pre># Azure CLI, to a resource group. Works with .json and .bicep
az deployment group create --resource-group rg1 --template-file main.bicep --parameters storageName=stcontoso01 sku=Standard_GRS
az deployment group create --resource-group rg1 --template-file template.json --parameters @parameters.json

# PowerShell
New-AzResourceGroupDeployment -ResourceGroupName rg1 -TemplateFile template.json -TemplateParameterFile parameters.json

# Preview the changes without making them
az deployment group what-if --resource-group rg1 --template-file main.bicep</pre></div>
<div class="tabla"><table>
<thead><tr><th>Scope</th><th>CLI</th><th>PowerShell</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td>Resource group</td><td><code>az deployment group create</code></td><td><code>New-AzResourceGroupDeployment</code></td><td>Most resources</td></tr>
<tr><td>Subscription</td><td><code>az deployment sub create</code></td><td><code>New-AzSubscriptionDeployment</code></td><td>Resource groups, policy and role assignments</td></tr>
<tr><td>Management group</td><td><code>az deployment mg create</code></td><td><code>New-AzManagementGroupDeployment</code></td><td>Policy across subscriptions</td></tr>
<tr><td>Tenant</td><td><code>az deployment tenant create</code></td><td><code>New-AzTenantDeployment</code></td><td>Management groups</td></tr>
</tbody></table></div>
<ul>
<li>Deployments above resource group level need a <code>--location</code>, which is only where the deployment record is kept.</li>
<li>In the portal, search for <strong>Deploy a custom template</strong> to paste or load a template and fill in its parameters.</li>
<li>A <strong>parameter file</strong> keeps the values apart from the template, so the same template serves development and production. It is JSON, or a <code>.bicepparam</code> file for Bicep.</li>
<li>Every deployment is recorded under <strong>Deployments</strong> in the resource group, with its template, parameters and outputs.</li>
</ul>

<h3>5. Deployment modes</h3>
<div class="tabla"><table>
<thead><tr><th>Mode</th><th>Resources in the template</th><th>Resources in the group but not in the template</th></tr></thead>
<tbody>
<tr><td><strong>Incremental</strong>, the default</td><td>Created or updated</td><td>Left alone</td></tr>
<tr><td><strong>Complete</strong></td><td>Created or updated</td><td><strong>Deleted</strong></td></tr>
</tbody></table></div>
<ul>
<li>Complete mode makes the resource group match the template exactly. Run <code>what-if</code> first.</li>
<li>In incremental mode, a resource that is in the template is updated as a whole. Properties you leave out can return to their defaults, so the template must describe the full resource, not only the change.</li>
</ul>

<h3>6. Exporting and converting</h3>
<div class="tabla"><table>
<thead><tr><th>Where</th><th>What you get</th></tr></thead>
<tbody>
<tr><td>Resource or resource group, <strong>Export template</strong></td><td>A template generated from the <em>current state</em>. It often contains hard-coded names and extra properties and usually needs cleaning</td></tr>
<tr><td>Resource group, <strong>Deployments</strong>, pick one, <strong>Template</strong></td><td>The <em>exact template</em> used for that deployment, with its parameters. It does not show changes made afterwards</td></tr>
<tr><td>Last page of a creation wizard, <strong>Download a template for automation</strong></td><td>The template the portal is about to deploy, before anything exists</td></tr>
</tbody></table></div>
<div class="tabla"><pre>az group export --name rg1 > exported.json
az bicep decompile --file exported.json      # JSON to Bicep
az bicep build --file main.bicep             # Bicep to JSON</pre></div>
<ul>
<li>Decompiling is a best effort. Expect warnings and some tidying.</li>
<li>A <strong>template spec</strong> stores a template as a resource in Azure, so it can be shared and controlled with RBAC.</li>
</ul>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 7. One managed disk, four ways</h3>
<p>This follows the official Lab 03. A small empty managed disk costs cents per month, and you delete it at the end.</p>
<h3>Part A. Export</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab07</code>. Create a managed disk <code>disk1</code>: no source, Standard HDD, 32 GiB. On the last page, open <strong>Download a template for automation</strong> and look at it before pressing Create.</li>
<li>After it deploys, open the resource group, <strong>Deployments</strong>, and view the template and parameters of the deployment.</li>
<li>Open the disk, <strong>Export template</strong>, and download the zip. Compare this template with the previous one.</li>
</ol>
<h3>Part B. Edit and redeploy in the portal</h3>
<ol>
<li>Search for <strong>Deploy a custom template</strong>, choose Build your own template, and load the exported file.</li>
<li>Change the disk name parameter to <code>disk2</code> and deploy to the same group.</li>
</ol>
<h3>Part C. Cloud Shell</h3>
<ol>
<li>Upload <code>template.json</code> and <code>parameters.json</code> to Cloud Shell. Edit the name in the parameter file to <code>disk3</code>.</li>
<li>Deploy with PowerShell, then change the name to <code>disk4</code> and deploy with the CLI.</li>
</ol>
<div class="tabla"><pre>New-AzResourceGroupDeployment -ResourceGroupName rg-az104-lab07 -TemplateFile template.json -TemplateParameterFile parameters.json
az deployment group create --resource-group rg-az104-lab07 --template-file template.json --parameters @parameters.json</pre></div>
<h3>Part D. Bicep</h3>
<ol>
<li>Run <code>az bicep decompile --file template.json</code> and open the result. Count the lines against the JSON.</li>
<li>Change the name to <code>disk5</code> and the size to 64, run a what-if, then deploy.</li>
</ol>
<div class="tabla"><pre>az deployment group what-if --resource-group rg-az104-lab07 --template-file template.bicep
az deployment group create --resource-group rg-az104-lab07 --template-file template.bicep
az disk list --resource-group rg-az104-lab07 --output table</pre></div>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab7", label: "The differences between the exported template and the one in the deployment history" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Template viewed before creation, in the deployment history and through Export template." },
        { id: "t2", texto: "Edited template deployed from the portal." },
        { id: "t3", texto: "Deployed with PowerShell and with the CLI using a parameter file." },
        { id: "t4", texto: "JSON decompiled to Bicep, what-if run, Bicep deployed." },
        { id: "t5", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Reading a template",
        enunciado: R`<p>You are given this fragment of an ARM template.</p>
<div class="tabla"><pre>"parameters": {
  "vmSize": { "type": "string", "defaultValue": "Standard_B2s",
              "allowedValues": [ "Standard_B2s", "Standard_D2s_v5" ] },
  "adminPassword": { "type": "securestring" }
},
"variables": { "nicName": "[concat(parameters('vmName'), '-nic')]" }</pre></div>`,
        partes: [
          { id: "a", pregunta: "You deploy without supplying any parameter values. What happens?", tipo: "opcion", respuesta: 2,
            opciones: ["The deployment uses Standard_B2s and an empty password", "The deployment fails because vmSize has no value", "You are asked for adminPassword, and vmSize takes Standard_B2s", "Both parameters take the first allowed value"],
            pistas: ["One parameter has a default. The other does not."],
            solucion: R`vmSize falls back to its default. adminPassword has none, so it must be supplied, and the tools prompt for it.` },
          { id: "b", pregunta: "You deploy with vmSize=Standard_E4s_v5. What happens?", tipo: "opcion", respuesta: 1,
            opciones: ["The VM is created with that size", "Validation fails before anything is deployed", "The size silently changes to Standard_B2s", "The VM is created and then resized"],
            pistas: ["Look at allowedValues."],
            solucion: R`The value is not in allowedValues, so the template fails validation and nothing is deployed.` },
          { id: "c", pregunta: "Why is adminPassword declared as securestring instead of string?", tipo: "opcion", respuesta: 0,
            opciones: ["Its value is not saved in the deployment history or shown in logs", "It forces the password to be 12 characters", "It stores the password in Key Vault automatically", "It encrypts the VM disks"],
            pistas: ["Think about who can read the Deployments blade afterwards."],
            solucion: R`A securestring value is not recorded with the deployment. It does not create a Key Vault secret or enforce complexity.` },
          { id: "d", pregunta: "Which three elements must every ARM template contain? Select three.", tipo: "multi", respuesta: [0, 1, 4],
            opciones: ["$schema", "contentVersion", "parameters", "variables", "resources", "outputs"],
            pistas: ["A template with nothing to pass in and nothing to return is still valid."],
            solucion: R`$schema, contentVersion and resources are required. Parameters, variables, functions and outputs are optional.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Deployment modes",
        enunciado: R`<p>The resource group rg1 contains a storage account <strong>st1</strong> and a virtual network <strong>vnet1</strong>. A template defines st1, with a different SKU, and a new public IP address <strong>pip1</strong>.</p>`,
        partes: [
          { id: "a", pregunta: "You deploy the template to rg1 with the default settings. What does rg1 contain afterwards?", tipo: "opcion", respuesta: 1,
            opciones: ["st1 and pip1", "st1 with the new SKU, vnet1 and pip1", "st1 with the old SKU, vnet1 and pip1", "Only pip1"],
            pistas: ["The default mode is incremental."],
            solucion: R`Incremental mode updates what is in the template, adds what is new and leaves everything else alone.` },
          { id: "b", pregunta: "You deploy the same template with --mode Complete. What does rg1 contain afterwards?", tipo: "opcion", respuesta: 0,
            opciones: ["st1 with the new SKU and pip1", "st1 with the new SKU, vnet1 and pip1", "Only vnet1", "Nothing. Complete mode empties the group first"],
            pistas: ["Complete mode makes the group match the template."],
            solucion: R`Complete mode deletes resources in the group that are not in the template, so vnet1 is removed.` },
          { id: "c", pregunta: "Before running the complete deployment, you want to see exactly what would be created, changed and deleted without changing anything. What do you use?", tipo: "opcion", respuesta: 3,
            opciones: ["az group export", "az bicep build", "A ReadOnly lock", "az deployment group what-if"],
            pistas: ["The command name is a question."],
            solucion: R`The what-if operation previews the changes a deployment would make.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Commands and scopes",
        enunciado: R`<p>Choose the command for each job.</p>`,
        partes: [
          { id: "a", pregunta: "Deploy main.bicep to the resource group rg-prod from Azure CLI.", tipo: "opcion", respuesta: 2,
            opciones: ["az bicep build --file main.bicep --resource-group rg-prod", "az group create --name rg-prod --template-file main.bicep", "az deployment group create --resource-group rg-prod --template-file main.bicep", "az deployment sub create --resource-group rg-prod --template-file main.bicep"],
            pistas: ["The scope is a resource group.", "bicep build only converts."],
            solucion: R`az deployment group create deploys to a resource group and accepts Bicep files directly.` },
          { id: "b", pregunta: "Deploy template.json with parameters.json to rg-prod from PowerShell.", tipo: "opcion", respuesta: 0,
            opciones: ["New-AzResourceGroupDeployment -ResourceGroupName rg-prod -TemplateFile template.json -TemplateParameterFile parameters.json", "New-AzResourceGroup -Name rg-prod -TemplateFile template.json", "New-AzDeployment -ResourceGroupName rg-prod -TemplateFile template.json", "Set-AzResource -ResourceGroupName rg-prod -TemplateFile template.json"],
            pistas: ["The cmdlet name contains both the scope and the word Deployment."],
            solucion: R`New-AzResourceGroupDeployment is the resource group cmdlet. New-AzDeployment, an alias of New-AzSubscriptionDeployment, works at subscription scope and takes no resource group.` },
          { id: "c", pregunta: "A Bicep file creates three resource groups and assigns a policy to the subscription. Which command deploys it?", tipo: "opcion", respuesta: 1,
            opciones: ["az deployment group create", "az deployment sub create", "az deployment tenant create", "az group deployment create"],
            pistas: ["A resource group cannot be created inside a resource group."],
            solucion: R`Resource groups and subscription-level policy assignments are subscription-scope resources, so the deployment targets the subscription and needs a --location for its record.` },
          { id: "d", pregunta: "A colleague sends you an ARM template in JSON and your team works only in Bicep. Which command converts it?", tipo: "opcion", respuesta: 3,
            opciones: ["az bicep build", "az bicep publish", "az deployment group export", "az bicep decompile"],
            pistas: ["Build goes from Bicep to JSON. You need the opposite."],
            solucion: R`az bicep decompile turns JSON into Bicep. az bicep build goes the other way.` }
        ] },
      { id: "q4", nivel: 2, titulo: "Reading Bicep",
        enunciado: R`<div class="tabla"><pre>param location string = resourceGroup().location
param count int = 2

resource vnet 'Microsoft.Network/virtualNetworks@2023-11-01' existing = {
  name: 'vnet-hub'
}

resource pip 'Microsoft.Network/publicIPAddresses@2023-11-01' = [for i in range(0, count): {
  name: 'pip-0'
  location: location
  sku: { name: 'Standard' }
  properties: { publicIPAllocationMethod: 'Static' }
}]</pre></div>
<p>Ignore for a moment that both public IPs would have the same name.</p>`,
        partes: [
          { id: "a", pregunta: "What does the deployment do to vnet-hub?", tipo: "opcion", respuesta: 2,
            opciones: ["Creates it if it is missing", "Recreates it with default settings", "Nothing. It only reads it, and fails if it does not exist", "Deletes it"],
            pistas: ["Look at the keyword before the equals sign."],
            solucion: R`The existing keyword refers to a resource already deployed. It is not created or changed.` },
          { id: "b", pregunta: "In which region are the public IP addresses created by default?", tipo: "opcion", respuesta: 1,
            opciones: ["The region of the Cloud Shell session", "The region of the resource group being deployed to", "The region of vnet-hub", "West Europe, the Bicep default"],
            pistas: ["Read the default value of the location parameter."],
            solucion: R`The parameter defaults to resourceGroup().location, the location of the target resource group.` },
          { id: "c", pregunta: "In the line that declares the public IP, what is the word pip?", tipo: "opcion", respuesta: 0,
            opciones: ["A symbolic name used only inside the Bicep file", "The name of the resource in Azure", "The resource type", "A module"],
            pistas: ["The Azure name is a property."],
            solucion: R`It is the symbolic name. The name in Azure comes from the name property.` }
        ] },
      { id: "q5", nivel: 3, titulo: "Exporting",
        enunciado: R`<p>Six months ago a colleague deployed a virtual machine from a template. Since then, someone has added two data disks in the portal.</p>`,
        partes: [
          { id: "a", pregunta: "You need a template that reflects the machine as it is today, including the data disks. Where do you get it?", tipo: "opcion", respuesta: 1,
            opciones: ["Resource group, Deployments, the original deployment, Template", "The VM or its resource group, Export template", "Azure Advisor", "The activity log"],
            pistas: ["One source shows what was deployed. The other shows what exists now."],
            solucion: R`Export template generates a template from the current state. The deployment history holds the original template, without the later changes.` },
          { id: "b", pregunta: "You need to redeploy exactly what was deployed six months ago, with the same parameter values. Where do you get it?", tipo: "opcion", respuesta: 0,
            opciones: ["Resource group, Deployments, the original deployment", "The VM, Export template", "az bicep decompile", "The VM, Properties"],
            pistas: ["Azure keeps a record of each deployment."],
            solucion: R`The deployment history stores the template and parameters used, and offers a Redeploy button.` },
          { id: "c", pregunta: "A template creates a virtual network and a network interface in its subnet. Sometimes the deployment fails because the network interface is created first. What do you add to the network interface in the JSON template?", tipo: "opcion", respuesta: 3,
            opciones: ["A condition element", "A copy element", "A CanNotDelete lock", "A dependsOn element naming the virtual network"],
            pistas: ["Resource Manager deploys in parallel unless told otherwise."],
            solucion: R`dependsOn makes Resource Manager wait for the virtual network. In Bicep the same effect comes from referring to the network by its symbolic name.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Declarative and idempotent:</strong> a template states the end state. Deploying it twice changes nothing the second time.`,
      R`<strong>Required in JSON:</strong> $schema, contentVersion, resources. Optional: parameters, variables, functions, outputs.`,
      R`<strong>Bicep</strong> compiles to JSON. Symbolic names create dependencies. <code>existing</code> reads without deploying. <code>build</code> goes to JSON, <code>decompile</code> comes back.`,
      R`<strong>Deploy:</strong> <code>az deployment group create</code> or <code>New-AzResourceGroupDeployment</code>. Scopes: group, sub, mg, tenant.`,
      R`<strong>Incremental</strong> (default) leaves other resources alone. <strong>Complete</strong> deletes what is not in the template. Preview with <code>what-if</code>.`,
      R`<strong>Export template</strong> gives the current state. The <strong>deployment history</strong> gives the original template. <code>securestring</code> keeps secrets out of that history.`
    ] }
  ]
});

LESSONS.push({
  id: "az-9", n: 9, fase: 3, codigo: "Virtual machines",
  titulo: "Virtual machines",
  sub: "Create a VM and know every piece it is made of: the size, the disks, how they are encrypted, and what moving it really changes.",
  horas: "5 hours",
  contexto: "Azure virtual machines. Components (VM, NIC, OS disk, VNet/subnet, NSG, public IP). Size families and the naming convention; resizing and when deallocation is needed. Power states: stopped versus stopped (deallocated) and billing. Disks: OS, temporary, data; managed disk types Standard HDD, Standard SSD, Premium SSD, Premium SSD v2, Ultra; snapshots and images; host caching. Encryption: server-side encryption with platform or customer-managed keys, encryption at host, Azure Disk Encryption (BitLocker and DM-Crypt with Key Vault, retiring 15 September 2028), confidential disk encryption. Moving VMs across resource groups, subscriptions and regions (Azure Resource Mover). Extensions, Run Command, redeploy, boot diagnostics. Official Lab 08.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">A virtual machine in Azure is not one resource. It is a small group of them: the VM itself, a network interface, an operating system disk, and around them a virtual network, usually a network security group and sometimes a public IP address. Each is billed, moved and deleted on its own.</p>
<p>That is why deleting a VM used to leave disks and addresses behind, and why the exam asks questions such as <em>what do you still pay for after stopping the machine?</em> The compute is rented by the second while it is allocated. The disks are rented for as long as they exist.</p>
<p>Three decisions dominate this lesson. The <strong>size</strong> fixes the processors, memory and limits. The <strong>disks</strong> fix performance and durability. The <strong>encryption</strong> option fixes who holds the keys and what is covered.</p>
<div class="nota"><strong>An analogy.</strong> Think of a rack server in a colocation centre. The chassis with its processors is the VM size. The drives slide out and can go into another chassis: those are managed disks. The network card has its own address and can be moved too. Azure simply lets you swap each of those parts with a command instead of a screwdriver.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Sizes</h3>
<div class="tabla"><table>
<thead><tr><th>Family</th><th>Purpose</th><th>Typical use</th></tr></thead>
<tbody>
<tr><td><strong>B</strong></td><td>Burstable</td><td>Test machines and small servers that are idle most of the time</td></tr>
<tr><td><strong>D</strong></td><td>General purpose</td><td>Most production workloads</td></tr>
<tr><td><strong>F</strong></td><td>Compute optimised</td><td>Batch processing, web front ends with heavy CPU</td></tr>
<tr><td><strong>E</strong>, <strong>M</strong></td><td>Memory optimised</td><td>Databases, in-memory analytics</td></tr>
<tr><td><strong>L</strong></td><td>Storage optimised</td><td>High disk throughput, big data</td></tr>
<tr><td><strong>N</strong></td><td>GPU</td><td>Rendering, machine learning</td></tr>
<tr><td><strong>H</strong></td><td>High performance computing</td><td>Simulation</td></tr>
</tbody></table></div>
<p>A name such as <code>Standard_D4s_v5</code> reads: family D, 4 virtual CPUs, <code>s</code> for premium storage support, version 5. Other letters you may see: <code>a</code> AMD processor, <code>d</code> has a local temporary disk, <code>p</code> ARM processor.</p>
<ul>
<li>The size also sets the maximum number of data disks and network interfaces.</li>
<li><strong>Resizing</strong> restarts the VM. If the new size is not available on the hardware where the VM runs now, you must <strong>deallocate</strong> it first, and then every size in the region is offered.</li>
<li>Changing size is <strong>vertical scaling</strong>, or scaling up and down. Adding machines is <strong>horizontal scaling</strong>, or scaling out and in, the subject of the next lesson.</li>
</ul>

<h3>2. Power states and the bill</h3>
<div class="tabla"><table>
<thead><tr><th>State</th><th>How you get there</th><th>Compute billed</th><th>Disks billed</th></tr></thead>
<tbody>
<tr><td>Running</td><td>Start</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Stopped</td><td>Shut down from inside the operating system</td><td><strong>Yes</strong></td><td>Yes</td></tr>
<tr><td>Stopped (deallocated)</td><td>Stop in the portal, <code>az vm deallocate</code>, <code>Stop-AzVM</code></td><td>No</td><td>Yes</td></tr>
</tbody></table></div>
<ul>
<li>Deallocating releases the hardware. The temporary disk is wiped and a dynamic public IP address is released. A static one is kept.</li>
<li><code>az vm stop</code> alone leaves the VM allocated and billed. <code>az vm deallocate</code> is the one that stops the charge.</li>
</ul>

<h3>3. Disks</h3>
<div class="tabla"><table>
<thead><tr><th>Disk</th><th>What it is</th></tr></thead>
<tbody>
<tr><td><strong>OS disk</strong></td><td>Holds the operating system. Persistent. Drive C on Windows</td></tr>
<tr><td><strong>Temporary disk</strong></td><td>Local to the host, for page files and scratch data. <strong>Not persistent</strong>: lost on deallocation, redeployment or host maintenance. Drive D on Windows, usually /dev/sdb on Linux. Not every size has one</td></tr>
<tr><td><strong>Data disks</strong></td><td>Persistent disks you attach for applications and data. Can be attached and detached while the VM runs</td></tr>
</tbody></table></div>
<div class="tabla"><table>
<thead><tr><th>Managed disk type</th><th>Use</th><th>Can be an OS disk</th></tr></thead>
<tbody>
<tr><td>Standard HDD</td><td>Backups, rarely used data</td><td>Yes</td></tr>
<tr><td>Standard SSD</td><td>Web servers, light production</td><td>Yes</td></tr>
<tr><td>Premium SSD</td><td>Production and databases</td><td>Yes</td></tr>
<tr><td>Premium SSD v2</td><td>Performance tuned independently of size</td><td>No, data only</td></tr>
<tr><td>Ultra Disk</td><td>The most demanding databases</td><td>No, data only</td></tr>
</tbody></table></div>
<ul>
<li>Premium disks need a size that supports premium storage, the <code>s</code> in the name.</li>
<li>A disk can be made larger but never smaller.</li>
<li>Changing the type of a disk, for example Standard HDD to Premium SSD, generally requires the VM to be deallocated.</li>
<li>A <strong>snapshot</strong> is a point-in-time copy of one disk. An <strong>image</strong> captures a whole VM as a model for new ones. Images are stored and shared through an <strong>Azure Compute Gallery</strong>.</li>
<li>Generalising a VM, with sysprep on Windows or the agent's deprovision command on Linux, makes the original unusable. You then create new machines from the image.</li>
<li>Managed disks are locally redundant by default. Premium SSD and Standard SSD also offer zone-redundant storage.</li>
</ul>

<h3>4. Encryption options</h3>
<div class="tabla"><table>
<thead><tr><th>Option</th><th>Where it encrypts</th><th>Covers</th></tr></thead>
<tbody>
<tr><td><strong>Server-side encryption</strong> (SSE)</td><td>In the storage service. Always on, cannot be disabled</td><td>OS and data disks at rest. Not the temporary disk or caches</td></tr>
<tr><td><strong>Encryption at host</strong></td><td>On the server that hosts the VM</td><td>Temporary disk and disk caches as well, and the data flowing to storage</td></tr>
<tr><td><strong>Azure Disk Encryption</strong> (ADE)</td><td>Inside the guest, with BitLocker on Windows or DM-Crypt on Linux</td><td>OS and data volumes. Keys kept in Azure Key Vault</td></tr>
<tr><td><strong>Confidential disk encryption</strong></td><td>Bound to the VM's virtual TPM</td><td>Confidential VMs only</td></tr>
</tbody></table></div>
<ul>
<li>SSE uses <strong>platform-managed keys</strong> by default. For <strong>customer-managed keys</strong> you create a <strong>disk encryption set</strong> that points to a key in Key Vault.</li>
<li>ADE needs a Key Vault in the <strong>same region and subscription</strong> as the VM, with the access setting <em>Azure Disk Encryption for volume encryption</em> enabled.</li>
<li>Encryption at host is enabled per VM, and an existing VM must be deallocated to turn it on.</li>
<li>ADE and encryption at host cannot be combined on the same VM.</li>
</ul>
<div class="nota"><strong>A change to know about.</strong> The exam outline still lists Azure Disk Encryption, so learn how it works. Microsoft has announced its retirement for 15 September 2028 and recommends encryption at host for new machines. A question that asks for the recommended way to cover the temporary disk expects encryption at host.</div>

<h3>5. Moving a VM</h3>
<div class="tabla"><table>
<thead><tr><th>Move</th><th>How</th><th>What to remember</th></tr></thead>
<tbody>
<tr><td>To another resource group</td><td>Move in the portal, <code>az resource move</code>, <code>Move-AzResource</code></td><td>The region does not change. The resource ID does. The VM keeps running</td></tr>
<tr><td>To another subscription</td><td>The same commands</td><td>Both subscriptions must be in the same Microsoft Entra tenant. Move dependent resources together</td></tr>
<tr><td>To another region</td><td><strong>Azure Resource Mover</strong>, which replicates the disks, or redeploy from a template or image</td><td>This is a copy to new hardware, with a short cutover</td></tr>
</tbody></table></div>
<ul>
<li>During a move, the source and target resource groups are <strong>locked</strong> for writes and deletes. The resources themselves keep working.</li>
<li>Because the resource ID changes, scripts and role assignments scoped to the old ID must be updated. Role assignments made directly on a moved resource are lost.</li>
<li>A ReadOnly lock on either group blocks the move.</li>
</ul>

<h3>6. Connecting and repairing</h3>
<ul>
<li>Windows is reached with RDP on TCP 3389, Linux with SSH on TCP 22. Azure Bastion, in lesson 14, avoids exposing either to the internet.</li>
<li><strong>Extensions</strong> are small agents that configure a VM after it is created. The <strong>Custom Script Extension</strong> downloads and runs a script. On Linux, <strong>cloud-init</strong> does first-boot configuration from custom data.</li>
<li><strong>Run Command</strong> executes a script through the VM agent, even when you cannot reach the machine over the network.</li>
<li><strong>Reset password</strong> uses the VMAccess extension to restore credentials or the remote desktop configuration.</li>
<li><strong>Boot diagnostics</strong> shows a screenshot and the serial log of a machine that will not start. The <strong>serial console</strong> gives a text console.</li>
<li><strong>Redeploy</strong> moves the VM to a different host. Try it when RDP or SSH fails for no visible reason. The temporary disk is lost.</li>
</ul>
<div class="tabla"><pre>az vm create --resource-group rg1 --name vm1 --image Ubuntu2204 --size Standard_B1s --admin-username azureuser --generate-ssh-keys
az vm list-sizes --location westeurope --output table
az vm resize --resource-group rg1 --name vm1 --size Standard_B2s
az vm disk attach --resource-group rg1 --vm-name vm1 --name data1 --new --size-gb 32 --sku StandardSSD_LRS
az vm deallocate --resource-group rg1 --name vm1
az vm run-command invoke --resource-group rg1 --name vm1 --command-id RunShellScript --scripts "df -h"</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 8. One small Linux VM</h3>
<p>This follows the first half of the official Lab 08. A B1s machine is covered by the free account for the first twelve months. Otherwise it costs about one cent per hour. Deallocate it when you stop for the day and delete the group at the end.</p>
<h3>Part A. Create</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab08</code>. Create a virtual machine <code>vm1</code>: Ubuntu Server LTS, size B1s, SSH key authentication, Standard SSD OS disk, no inbound ports open.</li>
<li>On the Review page, count the resources that will be created. Then open the resource group and list them.</li>
</ol>
<h3>Part B. Disks and size</h3>
<ol>
<li>Under <strong>Disks</strong>, create and attach a 32 GiB Standard HDD data disk while the VM is running.</li>
<li>Use <strong>Run command</strong> with <code>lsblk</code> to see the OS disk, the temporary disk if the size has one, and the new data disk.</li>
<li>Under <strong>Size</strong>, change to B2s. Note that the VM restarts. Then change back.</li>
<li>Detach the data disk, open it as a resource, and change its type to Standard SSD. Read what the portal requires.</li>
</ol>
<h3>Part C. States</h3>
<ol>
<li>Use Run command to run <code>sudo shutdown now</code>. Look at the status shown in the portal.</li>
<li>Press <strong>Stop</strong> and compare the status.</li>
<li>Open <strong>Boot diagnostics</strong> and <strong>Redeploy + reapply</strong> to see where they are. You do not need to run a redeploy.</li>
</ol>
<h3>Part D. Encryption, read only</h3>
<ol>
<li>Open the OS disk, <strong>Encryption</strong>, and read which key type is in use.</li>
<li>On the VM, open <strong>Disks</strong>, <strong>Additional settings</strong>, and find the encryption at host switch.</li>
</ol>
<h3>Clean up</h3>
<p>Delete the resource group. Check that the disks and network interface went with it.</p>`,
      notas: [{ id: "lab8", label: "The resources created with the VM, and the two statuses after shutting down from inside and stopping from the portal" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "VM created and its component resources listed." },
        { id: "t2", texto: "Data disk attached while running and seen with lsblk." },
        { id: "t3", texto: "VM resized up and back." },
        { id: "t4", texto: "Stopped and deallocated states compared." },
        { id: "t5", texto: "Encryption settings located." },
        { id: "t6", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "States and billing",
        enunciado: R`<p>A Windows VM named VM1 has a Premium SSD OS disk, one data disk, a temporary disk and a dynamic public IP address.</p>`,
        partes: [
          { id: "a", pregunta: "A user signs in to VM1 and chooses Shut down from the Start menu. What are you billed for?", tipo: "opcion", respuesta: 0,
            opciones: ["Compute and disks", "Disks only", "Nothing", "Compute only"],
            pistas: ["Shutting down from inside does not release the hardware."],
            solucion: R`The VM is Stopped but still allocated, so compute is billed, along with the disks.` },
          { id: "b", pregunta: "You stop VM1 from the portal. What are you billed for?", tipo: "opcion", respuesta: 1,
            opciones: ["Compute and disks", "Disks only", "Nothing", "Compute only"],
            pistas: ["The portal deallocates."],
            solucion: R`Stopped (deallocated) ends the compute charge. The managed disks still exist and are still billed.` },
          { id: "c", pregunta: "After you start VM1 again, which TWO things may have changed? Select two.", tipo: "multi", respuesta: [1, 2],
            opciones: ["The contents of the data disk", "The public IP address", "The contents of the temporary disk", "The private IP address inside its subnet"],
            pistas: ["What is tied to the physical host?", "The address is dynamic."],
            solucion: R`Deallocation releases a dynamic public IP and wipes the temporary disk. Data disks persist, and the private address stays reserved for the network interface.` },
          { id: "d", pregunta: "Where should an application on VM1 store a database that must survive maintenance?", tipo: "opcion", respuesta: 3,
            opciones: ["Drive D, the temporary disk", "Drive C, in the Windows folder", "The page file", "A data disk"],
            pistas: ["Only persistent disks qualify, and the OS disk is for the system."],
            solucion: R`A data disk. The temporary disk loses its contents on deallocation, redeployment or host maintenance.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Sizes and resizing",
        enunciado: R`<p>VM2 runs as Standard_D2s_v5 in West Europe.</p>`,
        partes: [
          { id: "a", pregunta: "What does the letter s in the size name tell you?", tipo: "opcion", respuesta: 2,
            opciones: ["It is a small size", "It runs on shared hardware", "It supports premium storage", "It is a spot instance"],
            pistas: ["It matters for the type of disk you can attach."],
            solucion: R`The s means the size supports Premium SSD disks.` },
          { id: "b", pregunta: "You want to resize VM2 to a memory-optimised size, but that size is missing from the list offered in the portal. What do you do first?", tipo: "opcion", respuesta: 1,
            opciones: ["Move VM2 to another resource group", "Stop (deallocate) VM2", "Detach the data disks", "Delete the network interface"],
            pistas: ["The list is limited by the hardware where the VM currently sits."],
            solucion: R`Deallocating frees the VM from its current hardware cluster, and then every size available in the region can be chosen.` },
          { id: "c", pregunta: "A database on VM2 needs more memory during month-end processing. Which kind of scaling is changing the VM size?", tipo: "opcion", respuesta: 0,
            opciones: ["Vertical scaling", "Horizontal scaling", "Autoscaling", "Geo-scaling"],
            pistas: ["You make one machine bigger. You do not add machines."],
            solucion: R`Vertical scaling, also called scaling up. Horizontal scaling adds or removes instances.` },
          { id: "d", pregunta: "A development server is idle most of the day with short peaks of activity, and cost matters most. Which family fits?", tipo: "opcion", respuesta: 0,
            opciones: ["B", "F", "M", "N"],
            pistas: ["One family accumulates credits while idle and spends them in bursts."],
            solucion: R`The B family is burstable: cheap, with CPU credits earned while idle.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Disk encryption",
        enunciado: R`<p>Your security team reviews how the disks of your virtual machines are protected.</p>`,
        partes: [
          { id: "a", pregunta: "You have done nothing about encryption on a new VM with managed disks. What is the state of its OS and data disks at rest?", tipo: "opcion", respuesta: 1,
            opciones: ["Not encrypted", "Encrypted by server-side encryption with platform-managed keys", "Encrypted with BitLocker", "Encrypted with customer-managed keys"],
            pistas: ["One option is always on."],
            solucion: R`Server-side encryption with platform-managed keys is on by default for all managed disks and cannot be turned off.` },
          { id: "b", pregunta: "The team wants the temporary disk and the disk caches encrypted too, using the approach Microsoft recommends for new machines. What do you enable?", tipo: "opcion", respuesta: 2,
            opciones: ["A disk encryption set", "Azure Storage firewall", "Encryption at host", "Soft delete"],
            pistas: ["Default server-side encryption does not cover the temporary disk."],
            solucion: R`Encryption at host encrypts on the host server, so temporary disks and caches are covered. Azure Disk Encryption also covers volumes inside the guest, but it is being retired in 2028.` },
          { id: "c", pregunta: "You must encrypt the volumes of a Windows VM with BitLocker through Azure Disk Encryption. Which requirement applies to the Key Vault?", tipo: "opcion", respuesta: 0,
            opciones: ["Same region and subscription as the VM, enabled for disk encryption", "Any region, as long as it is Premium tier", "It must be in the same resource group as the VM", "It must have a private endpoint"],
            pistas: ["The VM must reach the vault quickly and within its own boundaries."],
            solucion: R`The vault must be in the same region and subscription as the VM and have Azure Disk Encryption for volume encryption enabled. The resource group can differ.` },
          { id: "d", pregunta: "The team wants to control and rotate the keys used by server-side encryption of managed disks. Which resource do you create?", tipo: "opcion", respuesta: 3,
            opciones: ["A Recovery Services vault", "A storage account key", "A managed image", "A disk encryption set linked to a Key Vault key"],
            pistas: ["It sits between the disks and the key."],
            solucion: R`A disk encryption set connects managed disks to a customer-managed key in Key Vault.` }
        ] },
      { id: "q4", nivel: 2, titulo: "Moving",
        enunciado: R`<p>VM3 is in the resource group RG1, in subscription Sub1, in North Europe. RG2 is in the same subscription and was created in West Europe.</p>`,
        partes: [
          { id: "a", pregunta: "You move VM3 and its related resources to RG2. In which region does VM3 run afterwards?", tipo: "opcion", respuesta: 0,
            opciones: ["North Europe", "West Europe", "It depends on the size", "Both, until the next restart"],
            pistas: ["A resource group's location is only where its metadata is stored."],
            solucion: R`Moving between resource groups never changes the region of a resource.` },
          { id: "b", pregunta: "While the move is in progress, which statement is true?", tipo: "opcion", respuesta: 2,
            opciones: ["VM3 is stopped", "Users cannot connect to VM3", "You cannot create or delete resources in RG1 or RG2", "RG1 is deleted"],
            pistas: ["The control plane is affected. The data plane is not."],
            solucion: R`Both groups are locked for write and delete operations during the move. The VM keeps running and serving users.` },
          { id: "c", pregunta: "You need VM3 to run in West Europe with as little rebuilding as possible. What do you use?", tipo: "opcion", respuesta: 1,
            opciones: ["Move to another resource group", "Azure Resource Mover", "Change the Location property of the VM", "Azure Policy"],
            pistas: ["Changing region means copying disks to other datacentres."],
            solucion: R`Azure Resource Mover moves resources between regions, handling dependencies and replicating the disks. Location is not an editable property.` },
          { id: "d", pregunta: "A script refers to VM3 by its full resource ID. After the move to RG2, what must you do?", tipo: "opcion", respuesta: 3,
            opciones: ["Nothing. The ID is permanent", "Restart VM3", "Regenerate the SSH keys", "Update the script, because the resource ID contains the resource group"],
            pistas: ["Recall the shape of a resource ID from lesson 1."],
            solucion: R`A resource ID includes the subscription and the resource group, so it changes when the resource moves.` }
        ] },
      { id: "q5", nivel: 3, titulo: "Troubleshooting",
        enunciado: R`<p>Choose the right tool for each situation.</p>`,
        partes: [
          { id: "a", pregunta: "A Linux VM does not answer on SSH after a change to its firewall configuration. You need to run a command inside it to undo the change. What do you use?", tipo: "opcion", respuesta: 1,
            opciones: ["Boot diagnostics", "Run Command", "Resize", "Export template"],
            pistas: ["You need a channel that does not depend on the VM's network."],
            solucion: R`Run Command executes a script through the VM agent, without a network path to the machine. The serial console would also work.` },
          { id: "b", pregunta: "A Windows VM seems stuck while starting. You want to see what is on its screen. What do you open?", tipo: "opcion", respuesta: 0,
            opciones: ["Boot diagnostics", "Activity log", "Azure Advisor", "Effective security rules"],
            pistas: ["One feature captures a screenshot."],
            solucion: R`Boot diagnostics shows a screenshot of the console and the serial log.` },
          { id: "c", pregunta: "After every new VM is created from a marketplace image, a script must install a monitoring agent. Which feature runs it automatically as part of the deployment?", tipo: "opcion", respuesta: 2,
            opciones: ["Azure Bastion", "A resource lock", "The Custom Script Extension", "A snapshot"],
            pistas: ["It is a VM extension that downloads and runs scripts."],
            solucion: R`The Custom Script Extension runs scripts after provisioning and can be included in templates.` },
          { id: "d", pregunta: "RDP to a VM fails although the network rules are correct and the VM shows as running. You suspect a problem on the host. Which action moves the VM to a different host?", tipo: "opcion", respuesta: 3,
            opciones: ["Restart", "Reapply", "Reset password", "Redeploy"],
            pistas: ["Restart keeps the same host."],
            solucion: R`Redeploy shuts the VM down, moves it to a new host and starts it again. The temporary disk is lost.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>A VM is several resources:</strong> VM, NIC, OS disk, plus network, NSG and public IP. Disks are billed even when the VM is deallocated.`,
      R`<strong>Stopped</strong> from inside the OS is still billed. <strong>Stopped (deallocated)</strong> is not. Deallocation wipes the temporary disk and releases a dynamic public IP.`,
      R`<strong>Sizes:</strong> B burstable, D general, F compute, E and M memory, L storage, N GPU. The <code>s</code> means premium storage. If a size is not offered, deallocate first.`,
      R`<strong>Disks:</strong> OS, temporary (not persistent), data. Ultra and Premium SSD v2 are data only. Disks grow, never shrink.`,
      R`<strong>Encryption:</strong> SSE always on. Customer keys through a disk encryption set. Encryption at host covers temporary disks and caches. ADE uses BitLocker or DM-Crypt with a Key Vault in the same region and subscription, and retires in 2028.`,
      R`<strong>Moving</strong> between groups or subscriptions keeps the region, changes the ID and locks both groups. Between regions: Azure Resource Mover.`,
      R`<strong>Repair kit:</strong> Run Command, boot diagnostics, serial console, reset password, redeploy.`
    ] }
  ]
});

LESSONS.push({
  id: "az-10", n: 10, fase: 3, codigo: "Availability and scale",
  titulo: "Availability sets, zones and scale sets",
  sub: "One VM is a single point of failure. Spread copies across racks or datacentres, and let Azure add and remove copies as load changes.",
  horas: "4 hours",
  contexto: "High availability and scaling for Azure VMs. Availability sets: fault domains (up to 3) and update domains (default 5, up to 20), 99.95% SLA, VM must join at creation. Availability zones: at least three separate locations in a region, 99.99% SLA with two or more VMs in two or more zones, zonal versus zone-redundant resources, Standard public IP and Standard Load Balancer. Single VM SLA with premium disks 99.9%. Virtual Machine Scale Sets: Flexible and Uniform orchestration, autoscale (min, max, default, scale-out and scale-in rules, cooldown, schedules), scale-in policy, upgrade policy (manual, automatic, rolling), overprovisioning. Proximity placement groups. Official Lab 08.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">Hardware fails, and hosts are rebooted for updates. Azure does not promise that one virtual machine never goes down. It promises that if you run two or more copies and tell Azure to keep them apart, at least one stays up.</p>
<p>There are two ways to keep copies apart. An <strong>availability set</strong> spreads them over different racks in one datacentre. <strong>Availability zones</strong> spread them over different datacentres in one region. Zones protect against more, including the loss of a whole building.</p>
<p>Keeping copies apart handles failure. Handling load is a different question: how many copies do you need at three in the morning, and how many on Monday at nine? A <strong>Virtual Machine Scale Set</strong> manages a group of VMs as one resource and changes their number by rule.</p>
<div class="nota"><strong>An analogy from your field.</strong> An availability set is two line cards in different shelves with separate power feeds: one feed fails, the other card carries on. Availability zones are two exchanges in different parts of the city. A scale set is adding carriers to a cell as traffic rises and removing them at night.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Availability sets</h3>
<ul>
<li>A <strong>fault domain</strong> is a group of hardware sharing a power source and network switch, in practice a rack. An availability set has up to <strong>3</strong>, depending on the region.</li>
<li>An <strong>update domain</strong> is a group of VMs that Azure may reboot together during planned maintenance. Default <strong>5</strong>, configurable up to <strong>20</strong>. Only one update domain is rebooted at a time.</li>
<li>VMs are distributed over both in sequence. With 3 fault domains and 5 update domains, the sixth VM shares update domain 0 with the first.</li>
<li>A VM can join an availability set <strong>only when it is created</strong>. To add an existing VM, you delete it, keeping the disks, and recreate it in the set.</li>
<li>All VMs in a set must be in the same region and resource group as the set.</li>
<li>The set itself is free. It does not load-balance or replicate anything. You still need a load balancer and an application that runs on several machines.</li>
</ul>

<h3>2. Availability zones</h3>
<ul>
<li>A zone is one or more datacentres with independent power, cooling and networking. Regions that support zones have at least <strong>three</strong>.</li>
<li><strong>Zonal</strong> resources are pinned to one zone you choose: a VM, a managed disk with LRS, a zonal public IP.</li>
<li><strong>Zone-redundant</strong> resources are spread across zones by Azure: ZRS storage, a Standard public IP or Standard Load Balancer set as zone-redundant.</li>
<li>A VM is either in an availability set or in a zone, never both.</li>
<li>An LRS managed disk lives in one zone and can only be attached to a VM in that zone.</li>
<li>Zones need the <strong>Standard</strong> SKU of public IP addresses and load balancers.</li>
<li>Zone numbers are logical. Zone 1 in your subscription may be a different building from zone 1 in another subscription.</li>
</ul>

<h3>3. The service level agreements</h3>
<div class="tabla"><table>
<thead><tr><th>Deployment</th><th>Connectivity SLA</th><th>Protects against</th></tr></thead>
<tbody>
<tr><td>One VM with Premium SSD or Ultra disks</td><td>99.9%</td><td>Nothing beyond the hardware's own reliability</td></tr>
<tr><td>Two or more VMs in an availability set</td><td>99.95%</td><td>Rack failure, planned maintenance</td></tr>
<tr><td>Two or more VMs across two or more zones</td><td>99.99%</td><td>Datacentre failure</td></tr>
</tbody></table></div>
<p>None of these protects against the loss of a region. That needs a second region and Azure Site Recovery, in lesson 17.</p>

<h3>4. Virtual Machine Scale Sets</h3>
<ul>
<li>A scale set creates VMs from one model: image, size, disks, network and extensions.</li>
<li><strong>Flexible</strong> orchestration is the default and recommended mode. It manages standard VMs, can mix sizes, and spreads them across fault domains or zones. <strong>Uniform</strong> is the older mode, where all instances are identical and managed only through the set.</li>
<li>A scale set can span zones. It is normally placed behind a load balancer or an application gateway.</li>
<li>Up to 1,000 instances per scale set.</li>
<li>Scaling can be <strong>manual</strong>, a number you set, or <strong>autoscale</strong>.</li>
</ul>

<h3>5. Autoscale</h3>
<div class="tabla"><table>
<thead><tr><th>Setting</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><strong>Minimum</strong></td><td>Never fewer instances than this</td></tr>
<tr><td><strong>Maximum</strong></td><td>Never more than this, whatever the rules say</td></tr>
<tr><td><strong>Default</strong></td><td>The count used when metrics are not available</td></tr>
<tr><td><strong>Scale-out rule</strong></td><td>For example, average CPU above 70% for 10 minutes, add 1 instance</td></tr>
<tr><td><strong>Scale-in rule</strong></td><td>For example, average CPU below 30% for 10 minutes, remove 1 instance</td></tr>
<tr><td><strong>Cool down</strong></td><td>Minutes to wait after a scale action before another one</td></tr>
</tbody></table></div>
<ul>
<li>With several rules, the set scales <strong>out if any</strong> scale-out rule is met, and scales <strong>in only if all</strong> scale-in rules are met.</li>
<li>Always pair a scale-out rule with a scale-in rule, or the set grows and never shrinks.</li>
<li>Leave a gap between the two thresholds. If they are too close, the set oscillates, which is called <strong>flapping</strong>.</li>
<li>A profile can also be based on a <strong>schedule</strong>: fixed counts or different rules for working hours or specific dates.</li>
<li>Autoscale is a feature of Azure Monitor and is also used by App Service plans.</li>
</ul>
<p>A worked example. Minimum 2, maximum 10, default 2. Scale out by 2 when CPU exceeds 75%, scale in by 1 when CPU is below 25%, cool down 5 minutes. The set has 9 instances and CPU reaches 90%. The rule asks for 11, but the maximum is 10, so one instance is added.</p>

<h3>6. Other scale set settings</h3>
<ul>
<li><strong>Scale-in policy:</strong> which instances are removed first. <em>Default</em> balances across zones and fault domains and then removes the highest instance ID. <em>NewestVM</em> and <em>OldestVM</em> do what they say.</li>
<li><strong>Upgrade policy:</strong> what happens to existing instances when you change the model. <em>Manual</em>: nothing until you upgrade each instance. <em>Automatic</em>: all at once, in no fixed order. <em>Rolling</em>: in batches, with a pause between.</li>
<li><strong>Overprovisioning:</strong> the set creates extra instances and deletes the surplus once enough have started, to improve the success rate. You are not billed for the extras.</li>
<li><strong>Instance protection</strong> exempts one instance from scale-in or from all scale set actions.</li>
<li><strong>Reimage</strong> returns an instance to the state of the model's image.</li>
</ul>

<h3>7. Two neighbours</h3>
<ul>
<li>A <strong>proximity placement group</strong> keeps VMs physically close to each other for the lowest latency. It is about speed, not availability.</li>
<li>An <strong>Azure Dedicated Host</strong> gives you a physical server that no other customer shares, for compliance or licensing.</li>
</ul>
<div class="tabla"><pre>az vm availability-set create --resource-group rg1 --name avset1 --platform-fault-domain-count 2 --platform-update-domain-count 5
az vm create --resource-group rg1 --name vm1 --image Ubuntu2204 --availability-set avset1 --generate-ssh-keys
az vm create --resource-group rg1 --name vm2 --image Ubuntu2204 --zone 2 --generate-ssh-keys
az vmss create --resource-group rg1 --name vmss1 --image Ubuntu2204 --instance-count 2 --zones 1 2 3 --generate-ssh-keys
az vmss scale --resource-group rg1 --name vmss1 --new-capacity 4</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 9. A scale set that grows and shrinks</h3>
<p>This follows the second half of the official Lab 08. Two B1s instances cost about two cents per hour in total. Delete the group as soon as you finish.</p>
<h3>Part A. Create the scale set</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab09</code>. Create a Virtual Machine Scale Set <code>vmss1</code>: zones 1, 2 and 3, Flexible orchestration, Ubuntu Server LTS, size B1s, SSH key.</li>
<li>On the Networking tab, create a new virtual network and choose to create an Azure load balancer.</li>
<li>Set the initial instance count to 2 and create it.</li>
<li>Open <strong>Instances</strong> and note the zone of each.</li>
</ol>
<h3>Part B. Autoscale</h3>
<ol>
<li>Open <strong>Availability + scale</strong>, <strong>Scaling</strong>, and choose Custom autoscale.</li>
<li>Add a rule: Percentage CPU greater than 70, duration 10 minutes, increase count by 1, cool down 5 minutes.</li>
<li>Add the opposite rule: less than 30, decrease count by 1.</li>
<li>Set the limits: minimum 2, maximum 4, default 2. Save.</li>
<li>Read the <strong>Scale-in policy</strong> and the upgrade settings without changing them.</li>
</ol>
<h3>Part C. Watch it</h3>
<ol>
<li>Change the minimum to 3 and save. Watch the Instances page until a third instance appears, and note its zone.</li>
<li>Open <strong>Run history</strong> on the Scaling page to see the autoscale event.</li>
<li>Return the minimum to 2 and watch which instance is removed.</li>
</ol>
<h3>Part D. An availability set, read only</h3>
<ol>
<li>Search for Availability sets and start creating one. Look at the sliders for fault domains and update domains, then cancel.</li>
<li>Open any existing VM, <strong>Availability + scale</strong>, and confirm that the availability set cannot be changed.</li>
</ol>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab9", label: "The zone of each instance, and which instance was removed on scale-in" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Scale set created across three zones behind a load balancer." },
        { id: "t2", texto: "Scale-out and scale-in rules with limits configured." },
        { id: "t3", texto: "A scale-out and a scale-in observed in the run history." },
        { id: "t4", texto: "Availability set options reviewed." },
        { id: "t5", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Availability sets",
        enunciado: R`<p>You create an availability set with 2 fault domains and 5 update domains and deploy 6 virtual machines into it.</p>`,
        partes: [
          { id: "a", pregunta: "A rack loses power. What is the largest number of the 6 VMs that can go down?", tipo: "opcion", respuesta: 2,
            opciones: ["1", "2", "3", "6"],
            pistas: ["A rack is a fault domain. How are 6 VMs spread over 2 of them?"],
            solucion: R`Six VMs over two fault domains is three per fault domain, so one rack failure affects at most three.` },
          { id: "b", pregunta: "Azure performs planned maintenance on the hosts. What is the largest number of VMs restarted at the same time?", tipo: "opcion", respuesta: 1,
            opciones: ["1", "2", "3", "5"],
            pistas: ["Six VMs over five update domains: one domain holds two.", "Only one update domain is rebooted at a time."],
            solucion: R`VMs 1 to 5 take update domains 0 to 4 and the sixth returns to domain 0. That domain has two VMs, and one domain is updated at a time.` },
          { id: "c", pregunta: "An existing VM named VM7 must be added to the availability set. What do you do?", tipo: "opcion", respuesta: 3,
            opciones: ["Stop VM7 and change its availability set in the portal", "Move VM7 to the resource group of the set", "Run az vm update with the availability set", "Delete VM7 keeping its disks, and recreate it in the availability set"],
            pistas: ["When can a VM join a set?"],
            solucion: R`Membership is fixed at creation. You recreate the VM from its existing disks, this time selecting the set.` },
          { id: "d", pregunta: "What does an availability set cost?", tipo: "opcion", respuesta: 0,
            opciones: ["Nothing. You pay only for the VMs in it", "A fixed monthly fee", "A fee per fault domain", "A fee per update domain"],
            pistas: ["It is a grouping, not a compute resource."],
            solucion: R`The set is free. Each VM is billed as usual.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Choosing the protection",
        enunciado: R`<p>Match each requirement to a deployment.</p>`,
        partes: [
          { id: "a", pregunta: "An application must keep running if an entire datacentre in the region fails. What do you deploy?", tipo: "opcion", respuesta: 1,
            opciones: ["Two VMs in an availability set", "Two VMs in different availability zones", "One VM with Ultra disks", "Two VMs in a proximity placement group"],
            pistas: ["An availability set lives inside one datacentre."],
            solucion: R`Availability zones are separate datacentres, so losing one leaves the VM in another zone running.` },
          { id: "b", pregunta: "Which deployment has an SLA of 99.99%?", tipo: "opcion", respuesta: 2,
            opciones: ["One VM with premium disks", "Two VMs in an availability set", "Two VMs across two availability zones", "A VM on a dedicated host"],
            pistas: ["The highest SLA goes with the widest separation."],
            solucion: R`99.99% for two or more instances across two or more zones. An availability set gives 99.95% and a single VM with premium disks 99.9%.` },
          { id: "c", pregunta: "Two VMs exchange a very large number of small messages and need the lowest possible network latency between them. What do you use?", tipo: "opcion", respuesta: 0,
            opciones: ["A proximity placement group", "Two availability zones", "Two regions", "An update domain"],
            pistas: ["This requirement is about distance, not failure."],
            solucion: R`A proximity placement group places VMs physically close together. Spreading them over zones would increase latency.` },
          { id: "d", pregunta: "A VM is deployed in zone 1. You create a locally redundant managed disk in zone 2 and try to attach it. What happens?", tipo: "opcion", respuesta: 3,
            opciones: ["It attaches, with higher latency", "It attaches after the VM restarts", "Azure moves the disk to zone 1", "It cannot be attached, because the disk and VM are in different zones"],
            pistas: ["An LRS disk is a zonal resource."],
            solucion: R`A zonal disk can only be attached to a VM in the same zone.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Autoscale arithmetic",
        enunciado: R`<p>A scale set has these autoscale settings: minimum 2, maximum 8, default 3. Scale out by 2 instances when average CPU is above 80% for 10 minutes. Scale in by 1 instance when average CPU is below 30% for 10 minutes. Cool down 5 minutes for both.</p>`,
        partes: [
          { id: "a", pregunta: "The set has 7 instances and average CPU has been 95% for 10 minutes. How many instances after the scale action?", tipo: "opcion", respuesta: 1,
            opciones: ["7", "8", "9", "10"],
            pistas: ["7 + 2 would exceed a limit."],
            solucion: R`The rule asks for 9, and the maximum caps it at 8.` },
          { id: "b", pregunta: "The set has 2 instances and average CPU has been 5% for an hour. How many instances?", tipo: "opcion", respuesta: 2,
            opciones: ["0", "1", "2", "3"],
            pistas: ["The minimum is a floor."],
            solucion: R`Autoscale never goes below the minimum, so it stays at 2.` },
          { id: "c", pregunta: "The metrics pipeline fails and autoscale cannot read CPU. The set currently has 5 instances. What does autoscale do?", tipo: "opcion", respuesta: 0,
            opciones: ["Sets the count to the default, 3", "Scales to the maximum, 8", "Scales to the minimum, 2", "Deletes the scale set"],
            pistas: ["One of the three numbers exists for exactly this case."],
            solucion: R`The default instance count is used when metrics are not available.` },
          { id: "d", pregunta: "You add a second scale-in rule: scale in by 1 when the request queue is shorter than 100. CPU is at 20% and the queue length is 500. What happens?", tipo: "opcion", respuesta: 3,
            opciones: ["Scale in by 1", "Scale in by 2", "Scale out by 2", "Nothing"],
            pistas: ["Scale-in needs agreement among the scale-in rules."],
            solucion: R`Scale-in happens only when all scale-in rules are met. The queue rule is not met, so nothing changes. Scale-out, in contrast, needs only one rule.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Scale set behaviour",
        enunciado: R`<p>A scale set named VMSS1 runs a web application behind a load balancer.</p>`,
        partes: [
          { id: "a", pregunta: "You update the scale set model with a new image version. The existing instances keep running the old image until you act on each one. Which upgrade policy is set?", tipo: "opcion", respuesta: 0,
            opciones: ["Manual", "Automatic", "Rolling", "Default"],
            pistas: ["Which policy leaves the decision to you?"],
            solucion: R`With the Manual policy, existing instances change only when you upgrade them. Automatic updates all at once and Rolling in batches.` },
          { id: "b", pregunta: "You want new versions to reach instances in batches, with a pause to check health between batches. Which upgrade policy?", tipo: "opcion", respuesta: 2,
            opciones: ["Manual", "Automatic", "Rolling", "Overprovisioning"],
            pistas: ["Batches and pauses."],
            solucion: R`Rolling upgrades proceed batch by batch with an optional pause.` },
          { id: "c", pregunta: "When the set scales in, the instances that have run longest should be removed first. What do you configure?", tipo: "opcion", respuesta: 1,
            opciones: ["Upgrade policy Rolling", "Scale-in policy OldestVM", "Instance protection", "A cool down of zero"],
            pistas: ["It is a policy about scaling in."],
            solucion: R`The scale-in policy decides which instances go first. OldestVM removes the oldest, after balancing across zones.` },
          { id: "d", pregunta: "The autoscale configuration has a scale-out rule at CPU above 70% and no scale-in rule. What is the effect over time?", tipo: "opcion", respuesta: 3,
            opciones: ["The set returns to the minimum each night", "The set returns to the default after the cool down", "Autoscale refuses to save the configuration", "The set grows under load and never shrinks"],
            pistas: ["Nothing tells it to remove instances."],
            solucion: R`Without a scale-in rule, the instance count only ever increases, up to the maximum, and you pay for it.` },
          { id: "e", pregunta: "Which TWO resources are commonly placed in front of a scale set to distribute traffic to its instances? Select two.", tipo: "multi", respuesta: [0, 2],
            opciones: ["Azure Load Balancer", "Azure Bastion", "Application Gateway", "A resource lock"],
            pistas: ["One works at the transport layer, the other at the application layer."],
            solucion: R`Azure Load Balancer for layer 4 and Application Gateway for HTTP at layer 7.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Availability set:</strong> racks in one datacentre. Fault domains up to 3, update domains 5 by default and up to 20. Join only at creation. Free. 99.95%.`,
      R`<strong>Availability zones:</strong> separate datacentres in one region. 99.99% with two VMs in two zones. Needs Standard public IP and load balancer. Not combinable with an availability set.`,
      R`<strong>Single VM</strong> with premium disks: 99.9%. Region failure needs another region.`,
      R`<strong>Scale set:</strong> identical VMs from one model, Flexible orchestration by default, up to 1,000 instances.`,
      R`<strong>Autoscale:</strong> minimum, maximum, default (used without metrics). Out if any rule, in only if all rules. Always pair rules and leave a gap.`,
      R`<strong>Policies:</strong> scale-in (Default, NewestVM, OldestVM) and upgrade (Manual, Automatic, Rolling).`
    ] }
  ]
});

LESSONS.push({
  id: "az-11", n: 11, fase: 3, codigo: "Containers",
  titulo: "Containers: registry, instances and apps",
  sub: "Store images in Azure Container Registry, run one quickly with Container Instances, and run many with scaling in Container Apps.",
  horas: "4 hours",
  contexto: "Containers in Azure for AZ-104. Azure Container Registry: SKUs Basic, Standard, Premium (geo-replication, private endpoints), login server, authentication (Microsoft Entra, admin user, AcrPull and AcrPush roles, managed identity), ACR Tasks and az acr build. Azure Container Instances: container groups, restart policies Always, OnFailure, Never, CPU and memory sizing, public IP with DNS label or virtual network deployment, Azure Files volumes, per-second billing, no autoscale. Azure Container Apps: environment, revisions, ingress, scale rules (HTTP, TCP, CPU, memory, custom KEDA), scale to zero, replicas. Choosing between ACI, Container Apps, AKS and App Service. Official Labs 09b and 09c.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">A virtual machine carries a whole operating system. A container carries only the application and its libraries and borrows the kernel of the machine it runs on. It starts in seconds, weighs megabytes, and behaves the same on a laptop and in Azure.</p>
<p>Three words carry the topic. An <strong>image</strong> is the packaged application, a read-only template. A <strong>registry</strong> is where images are stored and versioned. A <strong>container</strong> is a running copy of an image.</p>
<p>The exam covers three services, and most questions come down to choosing between them. <strong>Azure Container Registry</strong> stores images. <strong>Azure Container Instances</strong> runs a container with no infrastructure and no orchestration: the fastest way to run one. <strong>Azure Container Apps</strong> runs containers with scaling, revisions and traffic management built in.</p>
<div class="nota"><strong>An analogy.</strong> An image is a firmware file. The registry is the firmware repository with its versions. A container is a device running that firmware. Container Instances is flashing one device by hand. Container Apps is the management system that keeps the right number of devices running, rolls out new firmware gradually and rolls it back.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Azure Container Registry</h3>
<ul>
<li>A private registry for container images. Its <strong>login server</strong> is <code>NAME.azurecr.io</code>. The name is globally unique, 5 to 50 letters and digits.</li>
<li>Images are grouped in <strong>repositories</strong> and identified by <strong>tags</strong>: <code>myregistry.azurecr.io/web/frontend:v2</code>.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>SKU</th><th>For</th><th>Notable features</th></tr></thead>
<tbody>
<tr><td><strong>Basic</strong></td><td>Learning and development</td><td>The same core capabilities, less storage and throughput</td></tr>
<tr><td><strong>Standard</strong></td><td>Most production use</td><td>More storage and throughput</td></tr>
<tr><td><strong>Premium</strong></td><td>High volume and enterprise needs</td><td><strong>Geo-replication</strong>, <strong>private endpoints</strong>, zone redundancy, the most storage</td></tr>
</tbody></table></div>
<ul>
<li>You can change SKU at any time without recreating the registry.</li>
<li><strong>Authentication.</strong> The recommended way is a Microsoft Entra identity with an RBAC role: <strong>AcrPull</strong> to pull images, <strong>AcrPush</strong> to push and pull. Services pull with a <strong>managed identity</strong>. The <strong>admin user</strong> is a single shared username with two passwords, disabled by default, meant for testing.</li>
<li><strong>ACR Tasks</strong> build images in Azure, so you do not need Docker on your machine. <code>az acr build</code> sends the source, builds the image and pushes it in one step.</li>
</ul>
<div class="tabla"><pre>az acr create --resource-group rg1 --name contosoreg01 --sku Basic
az acr login --name contosoreg01
az acr build --registry contosoreg01 --image web/frontend:v1 .
az acr repository list --name contosoreg01 --output table
az role assignment create --assignee PRINCIPAL_ID --role AcrPull --scope REGISTRY_ID</pre></div>

<h3>2. Azure Container Instances</h3>
<ul>
<li>Runs containers on demand with no servers to manage. Billing is <strong>per second</strong> for the vCPU and memory you request.</li>
<li>The top-level resource is a <strong>container group</strong>: one or more containers on the same host that share a lifecycle, an IP address, ports and storage volumes. It is the equivalent of a pod in Kubernetes.</li>
<li>Groups with several containers are supported on <strong>Linux</strong> only.</li>
<li>You set <strong>CPU and memory</strong> per container. The group gets the sum.</li>
<li>Networking: a <strong>public IP</strong> with an optional DNS label, giving <code>LABEL.REGION.azurecontainer.io</code>, or deployment into a <strong>virtual network</strong> subnet for private access.</li>
<li>Persistent storage: mount an <strong>Azure file share</strong> as a volume. Without one, data disappears with the container.</li>
<li>There is <strong>no autoscaling</strong> and no load balancing. One group is one set of containers.</li>
<li>Changing CPU, memory, restart policy or ports means deleting the group and creating it again.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>Restart policy</th><th>Behaviour</th><th>Use</th></tr></thead>
<tbody>
<tr><td><strong>Always</strong>, the default</td><td>Restarted whenever it stops</td><td>Long-running services such as a web server</td></tr>
<tr><td><strong>OnFailure</strong></td><td>Restarted only if the process exits with an error</td><td>Tasks that must complete once successfully</td></tr>
<tr><td><strong>Never</strong></td><td>Runs once, whatever the result</td><td>One-off jobs</td></tr>
</tbody></table></div>
<p>With OnFailure or Never, a container that finishes is stopped and billing for it ends.</p>
<div class="tabla"><pre>az container create --resource-group rg1 --name aci1 --image mcr.microsoft.com/azuredocs/aci-helloworld --os-type Linux --cpu 1 --memory 1.5 --ports 80 --dns-name-label contoso-demo-01 --restart-policy Always
az container show --resource-group rg1 --name aci1 --query ipAddress.fqdn
az container logs --resource-group rg1 --name aci1</pre></div>

<h3>3. Azure Container Apps</h3>
<ul>
<li>A serverless platform for containerised applications and microservices. It runs on Kubernetes, but you never see or manage the cluster.</li>
<li>Every app lives in a <strong>Container Apps environment</strong>, a secure boundary. Apps in one environment share a virtual network and a Log Analytics workspace and can call each other by name.</li>
<li><strong>Ingress</strong> can be <em>external</em>, reachable from the internet with HTTPS provided, or <em>internal</em>, reachable only within the environment's network.</li>
<li>A <strong>revision</strong> is an immutable snapshot of a version of the app. Changing the image or the scale rules creates a new revision. In <em>multiple revision</em> mode, several are active and you <strong>split traffic</strong> by percentage, for example 90 and 10.</li>
<li>Changes to secrets or ingress settings apply to the whole app and do not create a revision.</li>
</ul>
<p><strong>Scaling</strong> is expressed as a minimum and maximum number of <strong>replicas</strong> and a set of rules:</p>
<div class="tabla"><table>
<thead><tr><th>Rule type</th><th>Scales on</th><th>Can scale to zero</th></tr></thead>
<tbody>
<tr><td>HTTP</td><td>Concurrent HTTP requests per replica</td><td>Yes</td></tr>
<tr><td>TCP</td><td>Concurrent TCP connections</td><td>Yes</td></tr>
<tr><td>Custom</td><td>Any KEDA scaler: queue length, Service Bus, and so on</td><td>Yes</td></tr>
<tr><td>CPU or memory</td><td>Resource use</td><td>No</td></tr>
</tbody></table></div>
<ul>
<li>Minimum replicas can be <strong>0</strong>. With no traffic the app scales to zero and costs nothing for compute. The first request then waits for a cold start.</li>
<li>If you define no rule, a default HTTP rule applies.</li>
<li>Sizing is per container: a vCPU and memory allocation chosen in the app's template.</li>
</ul>
<div class="tabla"><pre>az containerapp env create --resource-group rg1 --name env1 --location westeurope
az containerapp create --resource-group rg1 --name app1 --environment env1 --image mcr.microsoft.com/k8se/quickstart:latest --target-port 80 --ingress external --min-replicas 0 --max-replicas 5
az containerapp revision list --resource-group rg1 --name app1 --output table</pre></div>

<h3>4. Choosing</h3>
<div class="tabla"><table>
<thead><tr><th>Need</th><th>Service</th></tr></thead>
<tbody>
<tr><td>Store and build private images</td><td>Azure Container Registry</td></tr>
<tr><td>Run one container or a short task quickly, pay per second, no scaling</td><td>Azure Container Instances</td></tr>
<tr><td>Microservices with autoscaling, scale to zero, revisions and traffic splitting, without managing Kubernetes</td><td>Azure Container Apps</td></tr>
<tr><td>Full control of Kubernetes itself</td><td>Azure Kubernetes Service, outside the current outline</td></tr>
<tr><td>A web application in a container, with slots and custom domains</td><td>App Service, in the next lesson</td></tr>
</tbody></table></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 10. One container, two ways</h3>
<p>This follows the official Labs 09b and 09c. Cost: a few cents if you delete everything within the hour.</p>
<h3>Part A. Container Instances</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab10</code>. Create a container instance <code>aci1</code>: image source Quickstart images, the helloworld Linux image, 1 vCPU and 1.5 GiB.</li>
<li>On the Networking tab, choose Public and give a unique DNS name label. On the Advanced tab, read the three restart policies.</li>
<li>After deployment, copy the FQDN from the Overview page and open it in a browser.</li>
<li>Open <strong>Containers</strong> and look at the Events and Logs tabs. Refresh the web page and watch a log line appear.</li>
<li>Try to find a setting to change the memory. Note that there is none.</li>
</ol>
<h3>Part B. Container Apps</h3>
<ol>
<li>Create a Container App <code>app1</code> in the same group. Let the wizard create a new environment.</li>
<li>On the Container tab, keep the quickstart image. Leave ingress enabled and external.</li>
<li>After deployment, open the Application URL.</li>
<li>Open <strong>Scale</strong> and read the minimum and maximum replicas. Set them to 0 and 3.</li>
<li>Open <strong>Revisions and replicas</strong> and see that the change created a new revision.</li>
</ol>
<h3>Part C. A registry, optional</h3>
<div class="tabla"><pre>az acr create --resource-group rg-az104-lab10 --name UNIQUENAME --sku Basic
az acr import --name UNIQUENAME --source mcr.microsoft.com/azuredocs/aci-helloworld:latest --image samples/hello:v1
az acr repository list --name UNIQUENAME --output table</pre></div>
<p>Open the registry in the portal and find <strong>Access keys</strong>, where the admin user is disabled, and <strong>Access control (IAM)</strong>, where AcrPull would be assigned.</p>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab10", label: "The FQDN of the container instance, and what happened to the revision list after changing the scale" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Container instance running and reached through its DNS name." },
        { id: "t2", texto: "Container logs read." },
        { id: "t3", texto: "Container App running in a new environment." },
        { id: "t4", texto: "Scale limits changed and the new revision seen." },
        { id: "t5", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Which service",
        enunciado: R`<p>Pick the service that fits each requirement with the least administration.</p>`,
        partes: [
          { id: "a", pregunta: "A script packaged as a container must run once every night for ten minutes. You want to pay only while it runs and manage no servers.", tipo: "opcion", respuesta: 0,
            opciones: ["Azure Container Instances", "A virtual machine scale set", "Azure Container Registry", "An availability set"],
            pistas: ["Per-second billing, no orchestration needed."],
            solucion: R`Container Instances starts a container on demand and bills per second. A registry stores images. It does not run them.` },
          { id: "b", pregunta: "An API in a container receives no requests at night and thousands per minute by day. It must scale automatically, including down to zero, and you do not want to manage Kubernetes.", tipo: "opcion", respuesta: 2,
            opciones: ["Azure Container Instances", "Azure Container Registry", "Azure Container Apps", "A single virtual machine"],
            pistas: ["Container Instances has no autoscale."],
            solucion: R`Container Apps scales on HTTP traffic and can go to zero replicas, with the cluster hidden.` },
          { id: "c", pregunta: "Your developers need a private place to keep the images they build, with access controlled through Microsoft Entra.", tipo: "opcion", respuesta: 1,
            opciones: ["Azure Files", "Azure Container Registry", "Azure Container Instances", "Azure Compute Gallery"],
            pistas: ["A registry."],
            solucion: R`Azure Container Registry is the private registry. Azure Compute Gallery stores VM images, not container images.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Container Registry",
        enunciado: R`<p>Your company has a registry named contosoreg in the Basic SKU.</p>`,
        partes: [
          { id: "a", pregunta: "The registry must replicate images to a second region and accept connections only through a private endpoint. What do you do?", tipo: "opcion", respuesta: 3,
            opciones: ["Enable the admin user", "Create a second Basic registry and copy images by hand", "Change the SKU to Standard", "Change the SKU to Premium"],
            pistas: ["Both features belong to the same SKU."],
            solucion: R`Geo-replication and private endpoints are Premium features. The SKU can be changed in place.` },
          { id: "b", pregunta: "A container app must pull images from contosoreg. Following least privilege, what do you grant to its managed identity?", tipo: "opcion", respuesta: 1,
            opciones: ["Contributor on the registry", "AcrPull on the registry", "AcrPush on the registry", "The admin user password"],
            pistas: ["It only needs to download images."],
            solucion: R`AcrPull allows pulling and nothing more. AcrPush would add the ability to upload.` },
          { id: "c", pregunta: "A developer has no Docker installation but must build an image from a Dockerfile and store it in contosoreg. Which command does both?", tipo: "opcion", respuesta: 0,
            opciones: ["az acr build", "az acr login", "az container create", "az acr import"],
            pistas: ["ACR Tasks can build in the cloud."],
            solucion: R`az acr build uploads the source, builds the image in Azure and pushes it to the registry.` },
          { id: "d", pregunta: "What is the full name used to pull the image api with tag v3 from the repository team1 in this registry?", tipo: "opcion", respuesta: 2,
            opciones: ["contosoreg/team1/api:v3", "contosoreg.azure.com/team1/api:v3", "contosoreg.azurecr.io/team1/api:v3", "team1.contosoreg.io/api:v3"],
            pistas: ["Login server, then repository, then tag."],
            solucion: R`The login server is contosoreg.azurecr.io, followed by the repository path and the tag.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Container Instances",
        enunciado: R`<p>You deploy workloads to Azure Container Instances.</p>`,
        partes: [
          { id: "a", pregunta: "A container processes a batch of files and then exits. If it crashes it must be retried, and when it succeeds it must stop and stop costing money. Which restart policy?", tipo: "opcion", respuesta: 1,
            opciones: ["Always", "OnFailure", "Never", "Rolling"],
            pistas: ["Retry on error, stop on success."],
            solucion: R`OnFailure restarts only after an error. With Always the finished container would be started again and again.` },
          { id: "b", pregunta: "A container writes reports that must survive when the container is deleted. What do you add to the container group?", tipo: "opcion", respuesta: 0,
            opciones: ["An Azure file share mounted as a volume", "A larger memory allocation", "A second container", "A DNS name label"],
            pistas: ["The container's own file system is temporary."],
            solucion: R`Mounting an Azure file share gives the container persistent storage outside its own life.` },
          { id: "c", pregunta: "A web container and a logging sidecar must run together, share a network address and start and stop as one. What do you deploy?", tipo: "opcion", respuesta: 3,
            opciones: ["Two container groups with the same DNS label", "Two virtual machines in an availability set", "One Windows container group with two containers", "One Linux container group with two containers"],
            pistas: ["Containers in a group share lifecycle and network.", "Multi-container groups have an operating system restriction."],
            solucion: R`A container group shares host, network and lifecycle. Groups with several containers are supported only on Linux.` },
          { id: "d", pregunta: "A running container group needs 4 GiB of memory instead of 1.5. What do you do?", tipo: "opcion", respuesta: 2,
            opciones: ["Change the memory under Settings and restart", "Add an autoscale rule", "Delete the container group and deploy it again with the new value", "Move it to a Premium SKU"],
            pistas: ["Resources of a container group are fixed at creation."],
            solucion: R`CPU and memory cannot be edited on an existing group. You redeploy it with new values.` },
          { id: "e", pregunta: "A container group must be reachable only from virtual machines in your virtual network, never from the internet. How do you deploy it?", tipo: "opcion", respuesta: 1,
            opciones: ["With a public IP and a long DNS label", "Into a subnet of the virtual network", "With restart policy Never", "With the admin user enabled"],
            pistas: ["There are two networking types for a container group."],
            solucion: R`Deploying the group into a subnet gives it a private address in the virtual network and no public one.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Container Apps",
        enunciado: R`<p>You run an application named shop in Azure Container Apps.</p>`,
        partes: [
          { id: "a", pregunta: "You deploy a new image version and want 10% of users on it while 90% stay on the current version. Which TWO things make this possible? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["Multiple revision mode", "A second environment", "Restart policy OnFailure", "Traffic splitting between revisions"],
            pistas: ["Each version of the app is a revision.", "Both versions must be active at once."],
            solucion: R`In multiple revision mode both revisions run, and ingress traffic weights send 90% to one and 10% to the other.` },
          { id: "b", pregunta: "Which change creates a new revision?", tipo: "opcion", respuesta: 2,
            opciones: ["Changing the value of a secret", "Switching ingress from external to internal", "Changing the container image tag", "Changing the traffic split"],
            pistas: ["Revisions capture the template: containers and scale."],
            solucion: R`The image is part of the revision template, so changing it creates a revision. Secrets, ingress and traffic weights are application-wide settings.` },
          { id: "c", pregunta: "The app must cost nothing for compute when idle, and it serves HTTP. What do you configure?", tipo: "opcion", respuesta: 0,
            opciones: ["Minimum replicas 0 with an HTTP scale rule", "Minimum replicas 1 with a CPU scale rule", "Restart policy Never", "A Basic SKU environment"],
            pistas: ["Scaling to zero is not possible with CPU or memory rules."],
            solucion: R`With a minimum of zero and an HTTP rule, the app has no replicas while there are no requests. CPU and memory rules cannot scale to zero.` },
          { id: "d", pregunta: "Two container apps, orders and payments, must call each other privately and send logs to the same Log Analytics workspace. Where do you place them?", tipo: "opcion", respuesta: 1,
            opciones: ["In the same container group", "In the same Container Apps environment", "In the same availability set", "In the same registry"],
            pistas: ["What is the boundary around a set of container apps?"],
            solucion: R`Apps in one environment share its virtual network and logging destination and can reach each other by name.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>ACR:</strong> <code>NAME.azurecr.io</code>. Basic, Standard, Premium. Geo-replication and private endpoints are Premium. Roles AcrPull and AcrPush. Admin user off by default. <code>az acr build</code> builds in the cloud.`,
      R`<strong>ACI:</strong> container group, per-second billing, CPU and memory fixed at creation, no autoscale. Multi-container groups are Linux only.`,
      R`<strong>Restart policy:</strong> Always (default, services), OnFailure (run to success), Never (run once).`,
      R`<strong>ACI networking and storage:</strong> public IP with DNS label or a subnet. Azure file share for persistence.`,
      R`<strong>Container Apps:</strong> environment, revisions, traffic splitting, external or internal ingress.`,
      R`<strong>Scaling in Container Apps:</strong> replicas between minimum and maximum. HTTP, TCP and custom rules can reach zero. CPU and memory cannot.`
    ] }
  ]
});

LESSONS.push({
  id: "az-12", n: 12, fase: 3, codigo: "App Service",
  titulo: "Azure App Service",
  sub: "Host web applications without managing servers: plans and tiers, scaling, custom domains and certificates, backups, networking and deployment slots.",
  horas: "5 hours",
  contexto: "Azure App Service for AZ-104. App Service plan: region, operating system, tier, instance count; apps in a plan share its instances. Tiers Free, Shared, Basic, Standard, Premium, Isolated and what each unlocks (custom domains, TLS, manual scale, autoscale, slots, backups). Scale up versus scale out, autoscale rules. Custom domains: CNAME, A record, asuid TXT verification. Certificates: free managed certificate, App Service certificate, Key Vault import, uploaded PFX; SNI and IP-based bindings; HTTPS only, minimum TLS. Backup: automatic and custom, storage account, linked database. Networking: access restrictions and private endpoints for inbound, virtual network integration and hybrid connections for outbound. Deployment slots: swap, slot settings, swap with preview, auto swap, traffic percentage. Official Lab 09a.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">App Service is platform as a service for web applications and APIs. You bring the code or a container. Azure supplies the operating system, the web server, the patches, the load balancer and the certificates.</p>
<p>The one concept that unlocks the whole topic is the <strong>App Service plan</strong>. The plan is the set of servers you pay for: their region, operating system, size, number and pricing tier. A <strong>web app</strong> is what runs on those servers. Several apps can share one plan, and then they share its processors and memory.</p>
<p>Almost every exam question about App Service has the same shape: <em>this feature is needed, which is the cheapest tier that has it?</em> So the tiers table below is the part to learn by heart.</p>
<div class="nota"><strong>An analogy.</strong> The plan is a rented hosting server. The apps are the virtual hosts configured on it. Adding a site costs nothing extra, but every site competes for the same hardware. Upgrading the server helps all of them at once.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. The plan and its tiers</h3>
<div class="tabla"><table>
<thead><tr><th>Tier</th><th>Compute</th><th>Custom domain</th><th>Scale out</th><th>Autoscale</th><th>Slots</th></tr></thead>
<tbody>
<tr><td><strong>Free</strong> (F1)</td><td>Shared with other customers, daily CPU quota</td><td>No</td><td>No</td><td>No</td><td>No</td></tr>
<tr><td><strong>Shared</strong> (D1)</td><td>Shared, larger quota</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
<tr><td><strong>Basic</strong> (B1 to B3)</td><td>Dedicated VMs</td><td>Yes, with TLS</td><td>Manual, up to 3</td><td>No</td><td>No</td></tr>
<tr><td><strong>Standard</strong> (S1 to S3)</td><td>Dedicated VMs</td><td>Yes, with TLS</td><td>Up to 10</td><td>Yes</td><td>5</td></tr>
<tr><td><strong>Premium</strong> (v2, v3, v4)</td><td>Faster dedicated VMs</td><td>Yes, with TLS</td><td>Up to 30</td><td>Yes</td><td>20</td></tr>
<tr><td><strong>Isolated</strong> (v2)</td><td>Dedicated VMs in your own App Service Environment</td><td>Yes, with TLS</td><td>Up to 100</td><td>Yes</td><td>20</td></tr>
</tbody></table></div>
<ul>
<li>Free and Shared are for development and testing. They have no SLA and cannot scale out.</li>
<li><strong>Basic</strong> is the first tier with dedicated machines, TLS bindings for custom domains, Always On and backups.</li>
<li><strong>Standard</strong> is the first tier with <strong>autoscale</strong> and <strong>deployment slots</strong>. These two are the most frequent tier questions.</li>
<li><strong>Isolated</strong> runs in an App Service Environment inside your virtual network, for full network isolation.</li>
<li>A plan is either Windows or Linux. Apps of both kinds cannot share a plan. Linux has no Shared tier.</li>
<li>An app can be moved to another plan only if that plan is in the same resource group and region.</li>
<li>A plan is billed while it exists, even with no apps in it and even when its apps are stopped.</li>
</ul>

<h3>2. Scaling</h3>
<ul>
<li><strong>Scale up</strong> changes the tier or size of the plan: more CPU, memory and features. <strong>Scale out</strong> changes the number of instances.</li>
<li>Both apply to the plan, so every app in the plan is affected.</li>
<li>Scale out is <strong>manual</strong> in Basic and above. <strong>Autoscale</strong>, from Standard, uses the same Azure Monitor rules as scale sets: metric or schedule, minimum, maximum, default, cool down, out if any rule and in if all rules.</li>
<li>Premium plans also offer <strong>automatic scaling</strong>, where the platform adds instances based on HTTP traffic without rules.</li>
<li>App Service load-balances across the instances for you.</li>
</ul>

<h3>3. Custom domains</h3>
<p>Every app gets <code>APPNAME.azurewebsites.net</code>. To use your own name, from the Shared tier up, you prove ownership and create a mapping record at your DNS provider.</p>
<div class="tabla"><table>
<thead><tr><th>Name to map</th><th>Mapping record</th><th>Verification record</th></tr></thead>
<tbody>
<tr><td>Subdomain, <code>www.contoso.com</code></td><td><strong>CNAME</strong> www to <code>APPNAME.azurewebsites.net</code></td><td>TXT <code>asuid.www</code> with the app's custom domain verification ID</td></tr>
<tr><td>Root domain, <code>contoso.com</code></td><td><strong>A</strong> record @ to the app's IP address</td><td>TXT <code>asuid</code> with the verification ID</td></tr>
</tbody></table></div>
<ul>
<li>A root domain cannot use a CNAME under DNS rules, which is why it needs an A record.</li>
<li>The TXT record lets you verify the domain before moving live traffic.</li>
</ul>

<h3>4. Certificates and TLS</h3>
<div class="tabla"><table>
<thead><tr><th>Certificate</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>App Service managed certificate</strong></td><td>Free, issued and renewed automatically. No wildcard and not exportable</td></tr>
<tr><td><strong>App Service certificate</strong></td><td>Bought through Azure and managed there. Supports wildcards</td></tr>
<tr><td><strong>Imported from Key Vault</strong></td><td>A certificate you already manage in a vault</td></tr>
<tr><td><strong>Uploaded private certificate</strong></td><td>A password-protected <strong>PFX</strong> file from any authority</td></tr>
<tr><td><strong>Uploaded public certificate</strong></td><td>A <strong>CER</strong> file. Not for securing a domain. Used by the app's code to trust remote resources</td></tr>
</tbody></table></div>
<ul>
<li>Securing a custom domain needs Basic or higher. The order is: add the domain, add the certificate, create the <strong>binding</strong>.</li>
<li>A binding is <strong>SNI SSL</strong>, several certificates on a shared address and the normal choice, or <strong>IP-based SSL</strong>, a dedicated address for old clients.</li>
<li><strong>HTTPS Only</strong> redirects HTTP to HTTPS. <strong>Minimum TLS version</strong> rejects older protocols.</li>
<li>The default azurewebsites.net name already has HTTPS with a Microsoft certificate.</li>
</ul>

<h3>5. Backup</h3>
<div class="tabla"><table>
<thead><tr><th></th><th>Automatic backups</th><th>Custom backups</th></tr></thead>
<tbody>
<tr><td>Set up</td><td>On by default, nothing to configure</td><td>You configure a <strong>storage account and container</strong></td></tr>
<tr><td>Frequency</td><td>Hourly</td><td>On demand or scheduled</td></tr>
<tr><td>Retention</td><td>30 days, fixed</td><td>You choose, up to indefinite</td></tr>
<tr><td>Size limit</td><td>30 GB</td><td>10 GB, including up to 4 GB of database</td></tr>
<tr><td>Linked database</td><td>No</td><td>Yes</td></tr>
</tbody></table></div>
<ul>
<li>Backups are available in Basic, Standard, Premium and Isolated plans.</li>
<li>A backup holds the app's files and configuration. You restore to the same app, to a slot or to a new app.</li>
<li>The storage account for custom backups should be in the same subscription as the app.</li>
</ul>

<h3>6. Networking</h3>
<p>The question to ask is always the direction of the traffic.</p>
<div class="tabla"><table>
<thead><tr><th>Direction</th><th>Feature</th><th>What it does</th></tr></thead>
<tbody>
<tr><td rowspan="2"><strong>Inbound</strong>, clients to the app</td><td>Access restrictions</td><td>An ordered allow and deny list by IP range, virtual network subnet or service tag</td></tr>
<tr><td>Private endpoint</td><td>Gives the app a private IP in your virtual network, so clients reach it without the internet</td></tr>
<tr><td rowspan="2"><strong>Outbound</strong>, the app to other things</td><td>Virtual network integration</td><td>Lets the app call resources inside a virtual network, such as a database VM. Needs a dedicated, delegated subnet</td></tr>
<tr><td>Hybrid connections</td><td>Lets the app reach one host and port on premises through a relay agent</td></tr>
</tbody></table></div>
<ul>
<li>Virtual network integration does <strong>not</strong> make the app private. It only affects calls the app makes. Private inbound access is the private endpoint.</li>
<li>Once any access restriction rule exists, an implicit deny-all applies to everything else.</li>
</ul>

<h3>7. Deployment slots</h3>
<ul>
<li>A slot is a live copy of the app with its own host name, <code>APPNAME-SLOTNAME.azurewebsites.net</code>, running in the <strong>same plan</strong>. Standard has 5, Premium and Isolated 20.</li>
<li>You deploy to a <strong>staging</strong> slot, test it, and <strong>swap</strong> it with production. Before swapping, App Service warms up the instances of the source slot, so there is no downtime.</li>
<li>If the new version misbehaves, <strong>swap again</strong> to roll back.</li>
<li><strong>Swap with preview</strong> applies the production settings to staging and pauses so you can test before completing.</li>
<li><strong>Auto swap</strong> swaps into production automatically after each deployment to the slot.</li>
<li>The <strong>traffic percentage</strong> setting sends part of production traffic to a slot, to test with real users.</li>
<li>Slots share the plan's resources. A load test on staging slows production.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>Swapped with the content</th><th>Stays with the slot</th></tr></thead>
<tbody>
<tr><td>App settings and connection strings, unless marked as slot settings</td><td>App settings and connection strings marked <strong>Deployment slot setting</strong></td></tr>
<tr><td>General settings such as framework version</td><td>Custom domain names, TLS bindings and private certificates</td></tr>
<tr><td>Handler mappings, WebJobs content</td><td>Scale settings, Always On, IP restrictions</td></tr>
<tr><td></td><td>Publishing endpoints, diagnostic settings, managed identities</td></tr>
</tbody></table></div>
<p>The typical use of a slot setting is a connection string: staging must keep pointing to the test database after the swap.</p>
<div class="tabla"><pre>az appservice plan create --resource-group rg1 --name plan1 --sku S1 --is-linux
az webapp create --resource-group rg1 --plan plan1 --name contoso-web-01 --runtime "PHP:8.3"
az webapp deployment slot create --resource-group rg1 --name contoso-web-01 --slot staging
az webapp deployment slot swap --resource-group rg1 --name contoso-web-01 --slot staging --target-slot production
az appservice plan update --resource-group rg1 --name plan1 --sku P1V3
az appservice plan update --resource-group rg1 --name plan1 --number-of-workers 3</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 11. A web app with a staging slot</h3>
<p>This follows the official Lab 09a. Slots need the Standard tier, about ten cents per hour for S1. Do the lab in one sitting and delete the group. Parts A and B also work on the Free tier.</p>
<h3>Part A. Plan and app</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab11</code>. Create a web app with a unique name: publish Code, runtime PHP 8, Linux, and a new plan in the Standard S1 tier.</li>
<li>Open the default URL. Open the plan as a separate resource and see the app listed in it.</li>
</ol>
<h3>Part B. Settings to find</h3>
<ol>
<li>On the app, open <strong>Custom domains</strong> and find the custom domain verification ID and the IP address.</li>
<li>Open <strong>Certificates</strong> and see the kinds you can add.</li>
<li>Open <strong>Networking</strong> and locate access restrictions, private endpoints and virtual network integration. Note which are inbound and which outbound.</li>
<li>Open <strong>Backups</strong> and see the automatic backups and the Configure custom backups button.</li>
</ol>
<h3>Part C. Slot and swap</h3>
<ol>
<li>Open <strong>Deployment slots</strong> and add a slot named <code>staging</code>. Open its URL.</li>
<li>On the staging slot, open <strong>Deployment Center</strong>, choose External Git, repository <code>https://github.com/Azure-Samples/php-docs-hello-world</code>, branch master. Save and wait for the deployment.</li>
<li>Reload the staging URL to see Hello World. Production still shows the default page.</li>
<li>On the staging slot, add an app setting <code>ENV = staging</code> and tick Deployment slot setting.</li>
<li>Press <strong>Swap</strong>, staging to production. Reload both URLs. Check where the ENV setting is now.</li>
</ol>
<h3>Part D. Scale</h3>
<ol>
<li>Open <strong>Scale out (App Service plan)</strong>. Choose rules-based scaling and look at the same rule editor you used for the scale set.</li>
<li>Open <strong>Scale up</strong> and read which features each tier adds.</li>
</ol>
<h3>Clean up</h3>
<p>Delete the resource group. Check that the plan has gone, since the plan is what is billed.</p>`,
      notas: [{ id: "lab11", label: "What each URL showed before and after the swap, and where the ENV setting ended up" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Web app created in a Standard plan." },
        { id: "t2", texto: "Domain, certificate, networking and backup pages located." },
        { id: "t3", texto: "Staging slot created and code deployed to it." },
        { id: "t4", texto: "Slots swapped and the slot setting checked." },
        { id: "t5", texto: "Scale out and scale up pages reviewed." },
        { id: "t6", texto: "Resource group deleted, including the plan." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "The cheapest tier that works",
        enunciado: R`<p>For each requirement, choose the lowest tier that meets it.</p>`,
        partes: [
          { id: "a", pregunta: "The app needs a staging slot.", tipo: "opcion", respuesta: 2,
            opciones: ["Shared", "Basic", "Standard", "Premium"],
            pistas: ["Slots start one tier above Basic."],
            solucion: R`Deployment slots start at Standard, with 5 slots.` },
          { id: "b", pregunta: "The instance count must change automatically with CPU load.", tipo: "opcion", respuesta: 2,
            opciones: ["Free", "Basic", "Standard", "Isolated"],
            pistas: ["Basic scales, but only by hand."],
            solucion: R`Autoscale starts at Standard. Basic allows manual scale out to 3 instances.` },
          { id: "c", pregunta: "The app must answer on www.contoso.com over HTTPS with your own certificate, on dedicated compute.", tipo: "opcion", respuesta: 1,
            opciones: ["Shared", "Basic", "Standard", "Premium"],
            pistas: ["Shared allows the custom name but not the TLS binding."],
            solucion: R`Basic is the first tier with dedicated machines and TLS bindings for custom domains.` },
          { id: "d", pregunta: "The app must run on hardware in your own virtual network, isolated from other customers.", tipo: "opcion", respuesta: 3,
            opciones: ["Basic", "Standard", "Premium", "Isolated"],
            pistas: ["The name of the tier says it."],
            solucion: R`Isolated plans run in an App Service Environment deployed into your virtual network.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Plans and scaling",
        enunciado: R`<p>The plan Plan1 is Standard S1 with two instances in West Europe. It hosts App1 and App2.</p>`,
        partes: [
          { id: "a", pregunta: "You scale Plan1 out to four instances. On how many instances does App2 run?", tipo: "opcion", respuesta: 2,
            opciones: ["1", "2", "4", "8"],
            pistas: ["Scaling belongs to the plan."],
            solucion: R`All apps in a plan run on all of its instances, so App2 also runs on four.` },
          { id: "b", pregunta: "App1 needs more memory per instance. What do you do?", tipo: "opcion", respuesta: 0,
            opciones: ["Scale up Plan1", "Scale out Plan1", "Add a deployment slot", "Enable Always On"],
            pistas: ["More of something on each machine, not more machines."],
            solucion: R`Scaling up changes the size of the instances. Scaling out adds instances of the same size.` },
          { id: "c", pregunta: "You stop App1 and App2 to save money. What happens to the bill for Plan1?", tipo: "opcion", respuesta: 1,
            opciones: ["It drops to zero", "It does not change", "It halves", "It changes to the Free tier"],
            pistas: ["What is the billed resource?"],
            solucion: R`The plan is billed for its instances while it exists. Stopping apps changes nothing. Delete the plan or move it to Free.` },
          { id: "d", pregunta: "You want to add a Windows .NET Framework app to Plan1, which is a Linux plan. What must you do?", tipo: "opcion", respuesta: 3,
            opciones: ["Add it. Plans accept both", "Scale Plan1 up to Premium", "Add a deployment slot for it", "Create a separate Windows plan"],
            pistas: ["The operating system is a property of the plan."],
            solucion: R`A plan is Windows or Linux. A Windows app needs its own Windows plan.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Domains and certificates",
        enunciado: R`<p>The app contoso-web must answer on <strong>www.contoso.com</strong> and on <strong>contoso.com</strong>. DNS is hosted at an external registrar.</p>`,
        partes: [
          { id: "a", pregunta: "Which record maps www.contoso.com to the app?", tipo: "opcion", respuesta: 0,
            opciones: ["CNAME www to contoso-web.azurewebsites.net", "MX www to contoso-web.azurewebsites.net", "NS www to azure-dns.com", "PTR www to the app's IP address"],
            pistas: ["An alias from one name to another."],
            solucion: R`A CNAME record points the subdomain to the app's default host name.` },
          { id: "b", pregunta: "Which record maps contoso.com, the root, to the app?", tipo: "opcion", respuesta: 1,
            opciones: ["CNAME @ to contoso-web.azurewebsites.net", "A @ to the app's IP address", "SRV @ to port 443", "TXT @ to the app's IP address"],
            pistas: ["DNS does not allow a CNAME at the root."],
            solucion: R`The root needs an A record to the app's inbound IP address, plus the TXT verification record.` },
          { id: "c", pregunta: "What is the purpose of the TXT record named asuid.www?", tipo: "opcion", respuesta: 2,
            opciones: ["It encrypts the traffic", "It redirects HTTP to HTTPS", "It proves that you own the domain", "It sets the time to live"],
            pistas: ["It contains the app's custom domain verification ID."],
            solucion: R`The asuid TXT record holds the verification ID, proving ownership to App Service.` },
          { id: "d", pregunta: "You want HTTPS on www.contoso.com at no cost and with automatic renewal. Which certificate?", tipo: "opcion", respuesta: 3,
            opciones: ["An uploaded CER file", "An App Service certificate", "A self-signed PFX", "An App Service managed certificate"],
            pistas: ["One kind is free."],
            solucion: R`The managed certificate is free and renews itself. It does not support wildcards. A CER file holds no private key and cannot secure a domain.` },
          { id: "e", pregunta: "The same certificate must cover every subdomain, *.contoso.com. Which TWO options can work? Select two.", tipo: "multi", respuesta: [1, 2],
            opciones: ["App Service managed certificate", "App Service certificate, wildcard", "A wildcard PFX uploaded from another authority", "An uploaded public CER certificate"],
            pistas: ["The free one does not support wildcards."],
            solucion: R`A purchased App Service certificate or an uploaded PFX can be wildcards. The free managed certificate cannot.` }
        ] },
      { id: "q4", nivel: 2, titulo: "Networking and backup",
        enunciado: R`<p>The app Orders runs in a Standard plan. A SQL Server runs on a virtual machine in the virtual network VNet1, with no public address.</p>`,
        partes: [
          { id: "a", pregunta: "Orders must connect to the SQL Server VM over its private address. What do you configure on the app?", tipo: "opcion", respuesta: 1,
            opciones: ["A private endpoint", "Virtual network integration", "Access restrictions", "A custom domain"],
            pistas: ["The app is the one starting the connection. That is outbound."],
            solucion: R`Virtual network integration routes the app's outbound calls into VNet1. A private endpoint handles inbound traffic to the app.` },
          { id: "b", pregunta: "Employees must reach Orders only from inside VNet1 through a private IP address, never over the internet. What do you configure?", tipo: "opcion", respuesta: 0,
            opciones: ["A private endpoint", "Virtual network integration", "Hybrid connections", "Auto swap"],
            pistas: ["Now the clients start the connection. That is inbound."],
            solucion: R`A private endpoint gives the app a private address in the virtual network for inbound traffic.` },
          { id: "c", pregunta: "Orders should accept requests only from the office's public IP range. What is the simplest setting?", tipo: "opcion", respuesta: 2,
            opciones: ["Virtual network integration", "Minimum TLS version", "Access restrictions", "A deployment slot"],
            pistas: ["An allow list by address."],
            solucion: R`An access restriction rule allowing the office range. Everything else is then denied implicitly.` },
          { id: "d", pregunta: "You must keep weekly backups of Orders, including its database, for one year. What do you need?", tipo: "opcion", respuesta: 3,
            opciones: ["Nothing. Automatic backups cover it", "A Premium plan", "A deployment slot named backup", "A custom backup configured with a storage account"],
            pistas: ["Automatic backups keep 30 days and have no database."],
            solucion: R`Custom backups let you set the schedule and retention and include a linked database. They need a storage account and container.` }
        ] },
      { id: "q5", nivel: 3, titulo: "Deployment slots",
        enunciado: R`<p>The app Shop has two slots, <strong>production</strong> and <strong>staging</strong>. These app settings exist:</p>
<div class="tabla"><table>
<thead><tr><th>Setting</th><th>Production</th><th>Staging</th><th>Deployment slot setting</th></tr></thead>
<tbody>
<tr><td>DB_CONN</td><td>prod-db</td><td>test-db</td><td>Yes</td></tr>
<tr><td>FEATURE_X</td><td>off</td><td>on</td><td>No</td></tr>
</tbody></table></div>
<p>You swap staging into production.</p>`,
        partes: [
          { id: "a", pregunta: "After the swap, what is DB_CONN in the production slot?", tipo: "opcion", respuesta: 0,
            opciones: ["prod-db", "test-db", "Empty", "Both values"],
            pistas: ["A slot setting is sticky."],
            solucion: R`Marked as a deployment slot setting, DB_CONN stays with its slot, so production keeps prod-db.` },
          { id: "b", pregunta: "After the swap, what is FEATURE_X in the production slot?", tipo: "opcion", respuesta: 1,
            opciones: ["off", "on", "Empty", "It is deleted"],
            pistas: ["This one is not sticky, so it travels with the code."],
            solucion: R`Settings not marked as slot settings are swapped with the content, so production now has on.` },
          { id: "c", pregunta: "Users report errors in the new version. What is the fastest way back?", tipo: "opcion", respuesta: 2,
            opciones: ["Restore last night's backup", "Redeploy the old code to production", "Swap the slots again", "Scale up the plan"],
            pistas: ["The previous version is still warm in the other slot."],
            solucion: R`After a swap, the old production version sits in staging. Swapping again restores it at once.` },
          { id: "d", pregunta: "Which of these does NOT move to production during a swap?", tipo: "opcion", respuesta: 3,
            opciones: ["The application code", "The framework version", "App settings not marked as slot settings", "The custom domain www.shop.com and its TLS binding"],
            pistas: ["If it moved, your public name would follow the old code."],
            solucion: R`Custom domains, TLS bindings and scale settings belong to the slot. That is why users keep reaching production on the same name.` },
          { id: "e", pregunta: "Before completing a swap you want staging to run with the production settings so you can test it against them. What do you use?", tipo: "opcion", respuesta: 1,
            opciones: ["Auto swap", "Swap with preview", "Traffic percentage 100", "A second plan"],
            pistas: ["A swap in two phases."],
            solucion: R`Swap with preview applies the target slot's settings to the source and pauses. You validate, then complete or cancel.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>The plan is what you pay for:</strong> region, OS, size, instance count, tier. Apps in a plan share its instances.`,
      R`<strong>Tiers:</strong> Free and Shared are shared compute, no scale out. Basic: dedicated, TLS, manual scale to 3, backups. Standard: autoscale to 10 and 5 slots. Premium: 30 and 20. Isolated: your own network.`,
      R`<strong>Scale up</strong> changes size or tier. <strong>Scale out</strong> changes the count. Autoscale from Standard.`,
      R`<strong>Custom domain:</strong> CNAME for a subdomain, A record for the root, TXT asuid to verify.`,
      R`<strong>Certificates:</strong> free managed (no wildcard), App Service certificate, Key Vault, PFX. CER is public only. SNI is the normal binding.`,
      R`<strong>Backup:</strong> automatic is hourly for 30 days. Custom needs a storage account and can include a database.`,
      R`<strong>Networking:</strong> inbound is access restrictions and private endpoints. Outbound is virtual network integration and hybrid connections.`,
      R`<strong>Slots:</strong> same plan, own host name. Swap warms up first, swap again to roll back. Slot settings, domains, TLS bindings and scale settings stay with the slot.`
    ] }
  ]
});


LESSONS.push({
  id: "az-13", n: 13, fase: 4, codigo: "VNets and routing",
  titulo: "Virtual networks, peering and routing",
  sub: "Plan address spaces and subnets, connect networks with peering, control the path of traffic with route tables and find out why a packet does not arrive.",
  horas: "5 hours",
  contexto: "Azure virtual networking basics. VNet address space (RFC 1918), subnets, five reserved addresses per subnet, smallest subnet /29, special subnets (GatewaySubnet, AzureBastionSubnet, AzureFirewallSubnet). Private IP allocation dynamic or static. Public IP addresses: Standard SKU (static, zone-redundant, closed by default), Basic SKU retired 30 September 2025, IPv4 and IPv6, public IP prefixes. Default outbound access ending: VNets created after 31 March 2026 have private subnets by default; explicit outbound with NAT gateway, load balancer outbound rules or public IP. VNet peering: regional and global, non-transitive, no overlapping address spaces, settings allow forwarded traffic, gateway transit and use remote gateways, peering status. System routes, user-defined routes, route tables, next hop types, longest prefix match, IP forwarding for NVAs, effective routes. Troubleshooting with Network Watcher: IP flow verify, next hop, connection troubleshoot. Official Labs 04 and 05.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">A virtual network is your private piece of the Azure network: an address space you choose, divided into subnets, where your virtual machines and other resources get their private addresses. By default everything inside one virtual network can talk to everything else, and nothing outside can start a conversation with it.</p>
<p>From there, three questions cover most of the domain. <strong>How do I connect two networks?</strong> With peering, or with a VPN gateway for sites outside Azure. <strong>Which path does traffic take?</strong> The one the route table says, and Azure creates a default route table you can override. <strong>Why does it not arrive?</strong> Network Watcher has a tool for each step of that investigation.</p>
<div class="nota"><strong>This is your home ground.</strong> Everything you know about IP addressing, CIDR, routing tables and longest prefix match applies unchanged. What is new is the vocabulary and a few Azure rules: five addresses reserved per subnet, peering that is not transitive, and route tables attached to subnets instead of routers. There is no router you can log into: the routing is done by the platform.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Address spaces and subnets</h3>
<ul>
<li>A virtual network belongs to one region and one subscription. It has one or more <strong>address spaces</strong> in CIDR, normally from the private ranges 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16.</li>
<li>Plan address spaces that <strong>do not overlap</strong> with other virtual networks or your on-premises networks. Overlapping networks cannot be peered or connected by VPN.</li>
<li>A <strong>subnet</strong> is a range inside the address space. Resources are placed in subnets, and network security groups and route tables are attached to subnets.</li>
<li>Azure <strong>reserves five addresses</strong> in every subnet: the network address, the first three host addresses (default gateway and two for Azure DNS) and the broadcast address. In 10.0.1.0/24, the first usable address is 10.0.1.4 and there are 251 usable addresses.</li>
<li>The smallest subnet is <strong>/29</strong>, which leaves 3 usable addresses.</li>
<li>You can add address spaces and resize subnets later, but a subnet with resources in it can only be resized if the existing addresses still fit.</li>
<li>Some services need a subnet with an exact name: <code>GatewaySubnet</code> for VPN and ExpressRoute gateways, <code>AzureBastionSubnet</code> for Bastion, <code>AzureFirewallSubnet</code> for Azure Firewall.</li>
<li>Some services need a <strong>delegated</strong> subnet, reserved for them, such as App Service virtual network integration.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>Prefix</th><th>Addresses</th><th>Usable in Azure</th></tr></thead>
<tbody>
<tr><td>/29</td><td>8</td><td>3</td></tr>
<tr><td>/28</td><td>16</td><td>11</td></tr>
<tr><td>/27</td><td>32</td><td>27</td></tr>
<tr><td>/26</td><td>64</td><td>59</td></tr>
<tr><td>/24</td><td>256</td><td>251</td></tr>
</tbody></table></div>

<h3>2. Private and public addresses</h3>
<ul>
<li>A network interface gets a <strong>private IP</strong> from its subnet, dynamic by default. Dynamic here means assigned by Azure and kept for the life of the interface. Set it to <strong>static</strong> when you need a fixed address, for example for a DNS server. Never change the IP inside the guest operating system: configure it on the network interface in Azure.</li>
<li>A <strong>public IP address</strong> is a separate resource that you associate with a network interface, a load balancer, a VPN gateway, a NAT gateway, Bastion or an application gateway.</li>
<li>The <strong>Standard SKU</strong> is the one to use: always static, zone-redundant or zonal, and <strong>secure by default</strong>, meaning inbound traffic is blocked until a network security group allows it.</li>
<li>The Basic SKU was retired on 30 September 2025. Older questions may still mention it: it allowed dynamic assignment, had no zones and was open by default.</li>
<li>A <strong>public IP prefix</strong> reserves a contiguous block of public addresses, useful when partners allow-list your outbound range.</li>
</ul>

<h3>3. Outbound internet access</h3>
<p>For years a VM with no public IP could still reach the internet through an address chosen by Azure, called <strong>default outbound access</strong>. That is ending. Virtual networks created after 31 March 2026 with recent tools have <strong>private subnets</strong> by default, and their VMs have no internet access unless you provide an explicit method:</p>
<ul>
<li>A <strong>NAT gateway</strong> on the subnet, the recommended option: all outbound traffic leaves through its public IPs.</li>
<li><strong>Outbound rules</strong> on a Standard load balancer.</li>
<li>A <strong>public IP</strong> on the VM's network interface.</li>
<li>A <strong>firewall</strong> or network virtual appliance, with a route that sends traffic to it.</li>
</ul>

<h3>4. Virtual network peering</h3>
<ul>
<li>Peering connects two virtual networks so that resources in them talk with private addresses over the Microsoft backbone, with no gateway and no encryption overhead.</li>
<li><strong>Regional</strong> peering connects networks in the same region. <strong>Global</strong> peering connects networks in different regions. Both are billed per gigabyte in each direction.</li>
<li>Peering works across subscriptions and even across Microsoft Entra tenants.</li>
<li>Address spaces must <strong>not overlap</strong>.</li>
<li>A peering is a pair of links, one created on each network. The portal creates both at once if you have permission on both. The status is <strong>Initiated</strong> when only one side exists and <strong>Connected</strong> when both do. If one side is deleted, the other shows <strong>Disconnected</strong> and must be deleted and recreated.</li>
<li>Peering is <strong>not transitive</strong>. If A is peered with B and B with C, A cannot reach C. You either peer A with C, or send traffic through a network virtual appliance or Azure Firewall in B with user-defined routes.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>Peering setting</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>Allow access to the remote network</td><td>The basic connectivity. On by default</td></tr>
<tr><td>Allow forwarded traffic</td><td>Accept traffic that did not originate in the peered network, for example traffic forwarded by an appliance</td></tr>
<tr><td>Allow gateway transit</td><td>Set on the <strong>hub</strong>: let the peer use this network's VPN gateway</td></tr>
<tr><td>Use remote gateways</td><td>Set on the <strong>spoke</strong>: send on-premises traffic through the hub's gateway. The spoke must not have its own gateway</td></tr>
</tbody></table></div>
<p>The common design is <strong>hub and spoke</strong>: shared services and the VPN gateway in a hub network, each workload in a spoke peered to the hub.</p>

<h3>5. Routing</h3>
<p>Every subnet starts with <strong>system routes</strong>: traffic inside the virtual network stays there, traffic to peered networks goes to the peering, traffic to 0.0.0.0/0 goes to the internet, and some private ranges go nowhere until you use them.</p>
<p>To change the path you create a <strong>route table</strong> with <strong>user-defined routes</strong> and associate it with one or more subnets.</p>
<div class="tabla"><table>
<thead><tr><th>Next hop type</th><th>Sends traffic to</th></tr></thead>
<tbody>
<tr><td><strong>Virtual appliance</strong></td><td>A private IP you specify, such as a firewall VM or Azure Firewall</td></tr>
<tr><td><strong>Virtual network gateway</strong></td><td>The VPN gateway of the network</td></tr>
<tr><td><strong>Virtual network</strong></td><td>The default routing inside the network</td></tr>
<tr><td><strong>Internet</strong></td><td>Azure's internet edge</td></tr>
<tr><td><strong>None</strong></td><td>Nowhere. The traffic is dropped</td></tr>
</tbody></table></div>
<ul>
<li>Route selection uses <strong>longest prefix match</strong>. If two routes have the same prefix, a user-defined route wins over a BGP route, which wins over a system route.</li>
<li>A route table can be associated with many subnets, but a subnet has only one route table. Route tables and the subnet must be in the same region and subscription.</li>
<li>A route table affects traffic <strong>leaving</strong> the subnet it is associated with. To force traffic both ways through an appliance, put a route on both subnets.</li>
<li>A VM acting as a router needs <strong>IP forwarding</strong> enabled on its network interface in Azure, and routing enabled in its operating system.</li>
<li>To send all internet-bound traffic through a firewall, the route is <code>0.0.0.0/0</code> with next hop Virtual appliance. This is called forced tunnelling when the next hop is on premises.</li>
<li><strong>Effective routes</strong>, on a VM's network interface, shows the combined result of system routes, user-defined routes and BGP routes.</li>
</ul>

<h3>6. Finding out why a packet does not arrive</h3>
<div class="tabla"><table>
<thead><tr><th>Network Watcher tool</th><th>Question it answers</th></tr></thead>
<tbody>
<tr><td><strong>IP flow verify</strong></td><td>Is this packet allowed or denied by a network security group, and by which rule?</td></tr>
<tr><td><strong>Next hop</strong></td><td>Where does traffic from this VM to that address go, and which route table decides it?</td></tr>
<tr><td><strong>Connection troubleshoot</strong></td><td>Can this VM reach that address and port at all, and where does it fail?</td></tr>
<tr><td><strong>Effective security rules</strong></td><td>Which rules from all network security groups apply to this network interface?</td></tr>
<tr><td><strong>Packet capture</strong></td><td>What exactly is on the wire?</td></tr>
<tr><td><strong>Topology</strong></td><td>How are the resources of this network connected?</td></tr>
</tbody></table></div>
<p>A good order: effective routes and next hop for the path, IP flow verify and effective security rules for the filters, connection troubleshoot for the end-to-end result. Network Watcher is enabled automatically per region when you create a virtual network.</p>
<div class="tabla"><pre>az network vnet create --resource-group rg1 --name vnet-hub --address-prefixes 10.0.0.0/16 --subnet-name shared --subnet-prefixes 10.0.0.0/24
az network vnet subnet create --resource-group rg1 --vnet-name vnet-hub --name GatewaySubnet --address-prefixes 10.0.255.0/27
az network vnet peering create --resource-group rg1 --name hub-to-spoke --vnet-name vnet-hub --remote-vnet vnet-spoke --allow-vnet-access --allow-forwarded-traffic
az network route-table create --resource-group rg1 --name rt-spoke
az network route-table route create --resource-group rg1 --route-table-name rt-spoke --name to-internet --address-prefix 0.0.0.0/0 --next-hop-type VirtualAppliance --next-hop-ip-address 10.0.1.4
az network vnet subnet update --resource-group rg1 --vnet-name vnet-spoke --name app --route-table rt-spoke
az network nic show-effective-route-table --resource-group rg1 --name vm1-nic --output table</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 12. Two networks, a peering and a route</h3>
<p>This combines the official Labs 04 and 05. Virtual networks and route tables are free. The two B1s VMs cost a few cents per hour, and peering traffic a fraction of a cent. Delete everything at the end.</p>
<h3>Part A. Networks</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab12</code>. Create <code>vnet-core</code> with 10.20.0.0/16 and a subnet <code>core</code> 10.20.0.0/24.</li>
<li>Create <code>vnet-mfg</code> with 10.30.0.0/16 and a subnet <code>mfg</code> 10.30.0.0/24, in the same region.</li>
<li>Look at the subnet page: how many addresses does the portal say are available?</li>
</ol>
<h3>Part B. Two VMs</h3>
<ol>
<li>Create <code>vm-core</code> in the core subnet and <code>vm-mfg</code> in the mfg subnet: Ubuntu, B1s, no public IP. Note their private addresses.</li>
<li>On vm-core, use Run command to run <code>ping -c 3 10.30.0.4</code>, or the address of vm-mfg. It fails, because the networks are not connected.</li>
</ol>
<h3>Part C. Peering</h3>
<ol>
<li>On vnet-core, open <strong>Peerings</strong> and add a peering to vnet-mfg, creating both links. Read each setting before accepting the defaults.</li>
<li>Check the status on both networks. Run the ping again from Run command.</li>
<li>Open Network Watcher, <strong>Connection troubleshoot</strong>, from vm-core to vm-mfg on port 22, and read the hops.</li>
</ol>
<h3>Part D. A route</h3>
<ol>
<li>Create a route table <code>rt-core</code> with a route <code>to-mfg</code>: destination 10.30.0.0/16, next hop type <strong>None</strong>. Associate it with the core subnet.</li>
<li>Repeat the ping. Then open vm-core's network interface, <strong>Effective routes</strong>, and find your route.</li>
<li>Use Network Watcher <strong>Next hop</strong> from vm-core to 10.30.0.4 and read the answer.</li>
<li>Dissociate the route table and confirm the ping works again.</li>
</ol>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab12", label: "The ping results before peering, after peering and with the route, and what Next hop reported" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Two networks with non-overlapping address spaces created." },
        { id: "t2", texto: "Peering created and status Connected on both sides." },
        { id: "t3", texto: "Connectivity checked with ping and Connection troubleshoot." },
        { id: "t4", texto: "A user-defined route blocked traffic, confirmed with Effective routes and Next hop." },
        { id: "t5", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Addressing",
        enunciado: R`<p>You plan subnets in a virtual network with the address space 10.1.0.0/16.</p>`,
        partes: [
          { id: "a", pregunta: "A subnet is 10.1.5.0/24. How many addresses can you assign to resources?", tipo: "opcion", respuesta: 2,
            opciones: ["256", "254", "251", "250"],
            pistas: ["Azure reserves five addresses in every subnet."],
            solucion: R`256 minus the 5 reserved addresses leaves 251.` },
          { id: "b", pregunta: "In that subnet, which is the first address a VM can receive?", tipo: "opcion", respuesta: 3,
            opciones: ["10.1.5.0", "10.1.5.1", "10.1.5.3", "10.1.5.4"],
            pistas: ["The network address and the next three are reserved."],
            solucion: R`.0 is the network, .1 the default gateway, .2 and .3 are used for Azure DNS, so the first usable address is .4.` },
          { id: "c", pregunta: "A subnet must hold exactly 20 VMs, with the smallest possible prefix. Which size?", tipo: "opcion", respuesta: 1,
            opciones: ["/28", "/27", "/26", "/29"],
            pistas: ["A /28 gives 11 usable addresses in Azure."],
            solucion: R`A /27 has 32 addresses, 27 usable after the reservation. A /28 has only 11.` },
          { id: "d", pregunta: "A DNS server VM must always keep the address 10.1.0.10. Where do you set it?", tipo: "opcion", respuesta: 0,
            opciones: ["On the VM's network interface in Azure, as a static private IP", "Inside the guest operating system's network settings", "In a route table", "On the virtual network's DNS servers setting"],
            pistas: ["Azure, not the guest, assigns addresses through its DHCP."],
            solucion: R`Set the private IP to static on the network interface. Changing it inside the guest breaks connectivity.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Peering",
        enunciado: R`<p>You have three virtual networks: <strong>VNet1</strong> 10.1.0.0/16, <strong>VNet2</strong> 10.2.0.0/16 and <strong>VNet3</strong> 10.1.128.0/17. VNet1 is peered with VNet2.</p>`,
        partes: [
          { id: "a", pregunta: "Can VNet3 be peered with VNet1?", tipo: "opcion", respuesta: 1,
            opciones: ["Yes", "No, because the address spaces overlap", "Only with global peering", "Only if they are in the same subscription"],
            pistas: ["Compare 10.1.0.0/16 and 10.1.128.0/17."],
            solucion: R`10.1.128.0/17 is inside 10.1.0.0/16. Overlapping address spaces cannot be peered.` },
          { id: "b", pregunta: "You peer VNet2 with VNet3. Can a VM in VNet1 reach a VM in VNet3 through VNet2, with no other configuration?", tipo: "opcion", respuesta: 2,
            opciones: ["Yes, peering is transitive", "Yes, if both peerings are global", "No, peering is not transitive", "Only if VNet2 has a NAT gateway"],
            pistas: ["What does A to B and B to C give you?"],
            solucion: R`Peering is not transitive. You would need a direct peering, which is impossible here because of the overlap, or an appliance in VNet2 with routes.` },
          { id: "c", pregunta: "An administrator deleted the peering link on VNet2. What is the status of the link that remains on VNet1?", tipo: "opcion", respuesta: 3,
            opciones: ["Connected", "Initiated", "Updating", "Disconnected"],
            pistas: ["One side still exists, but its partner is gone."],
            solucion: R`The remaining link shows Disconnected. Delete it and create the peering again on both sides.` },
          { id: "d", pregunta: "VNet1 is a hub with a VPN gateway to the office. VNet2 must reach the office through it. Which TWO settings do you enable? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["Allow gateway transit on the VNet1 side", "Allow gateway transit on the VNet2 side", "Use remote gateways on the VNet1 side", "Use remote gateways on the VNet2 side"],
            pistas: ["The network that owns the gateway allows transit.", "The network that borrows it uses remote gateways."],
            solucion: R`The hub, VNet1, allows gateway transit. The spoke, VNet2, uses remote gateways, and must not have its own gateway.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Routes",
        enunciado: R`<p>The subnet App, in VNet1, has a route table with these user-defined routes.</p>
<div class="tabla"><table>
<thead><tr><th>Name</th><th>Prefix</th><th>Next hop</th></tr></thead>
<tbody>
<tr><td>R1</td><td>0.0.0.0/0</td><td>Virtual appliance 10.0.0.4</td></tr>
<tr><td>R2</td><td>10.2.0.0/16</td><td>Virtual appliance 10.0.0.4</td></tr>
<tr><td>R3</td><td>10.2.1.0/24</td><td>None</td></tr>
</tbody></table></div>
<p>VNet1 is peered with VNet2, 10.2.0.0/16.</p>`,
        partes: [
          { id: "a", pregunta: "A VM in App sends traffic to 10.2.1.20. What happens?", tipo: "opcion", respuesta: 2,
            opciones: ["It goes to the appliance", "It goes directly over the peering", "It is dropped", "It goes to the internet"],
            pistas: ["Longest prefix match."],
            solucion: R`10.2.1.0/24 is the most specific match and its next hop is None, so the traffic is dropped.` },
          { id: "b", pregunta: "A VM in App sends traffic to 10.2.7.9. What happens?", tipo: "opcion", respuesta: 0,
            opciones: ["It goes to the appliance at 10.0.0.4", "It goes directly over the peering", "It is dropped", "It goes to the internet"],
            pistas: ["The peering creates a system route for 10.2.0.0/16. Which wins on equal prefixes?"],
            solucion: R`R2 and the peering's system route have the same prefix, and a user-defined route wins over a system route.` },
          { id: "c", pregunta: "Traffic reaches the appliance VM at 10.0.0.4 but is never forwarded. Its operating system has routing enabled. What is missing?", tipo: "opcion", respuesta: 1,
            opciones: ["A public IP on the appliance", "IP forwarding on the appliance's network interface in Azure", "Allow gateway transit on the peering", "A NAT gateway"],
            pistas: ["Azure drops packets whose destination is not the interface's own address unless told otherwise."],
            solucion: R`IP forwarding must be enabled on the network interface in Azure, as well as in the guest.` },
          { id: "d", pregunta: "Which tool shows you, for a specific VM and destination, the next hop and which route table chose it?", tipo: "opcion", respuesta: 3,
            opciones: ["IP flow verify", "Packet capture", "Activity log", "Network Watcher Next hop"],
            pistas: ["The tool is named after the answer."],
            solucion: R`Next hop returns the next hop type, its address and the route table responsible.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Public and outbound",
        enunciado: R`<p>You deploy new virtual machines in a virtual network created this year.</p>`,
        partes: [
          { id: "a", pregunta: "VMs in a new private subnet must download updates from the internet through a fixed set of public addresses, without having public IPs themselves. What is the recommended solution?", tipo: "opcion", respuesta: 0,
            opciones: ["A NAT gateway associated with the subnet", "A Basic public IP on each VM", "Virtual network peering", "A private endpoint"],
            pistas: ["Explicit outbound, for a whole subnet, no inbound exposure."],
            solucion: R`A NAT gateway gives the subnet outbound connectivity through its static public IPs, with no inbound exposure.` },
          { id: "b", pregunta: "You associate a Standard public IP with a VM's network interface. No network security group exists. Can you reach the VM from the internet on port 22?", tipo: "opcion", respuesta: 1,
            opciones: ["Yes, Standard IPs are open by default", "No, Standard IPs are secure by default and need a network security group that allows the traffic", "Only after a restart", "Only if the IP is dynamic"],
            pistas: ["Standard SKU resources are closed until you open them."],
            solucion: R`A Standard public IP blocks inbound traffic until a network security group explicitly allows it.` },
          { id: "c", pregunta: "Which TWO statements about Standard public IP addresses are true? Select two.", tipo: "multi", respuesta: [0, 2],
            opciones: ["They are always statically assigned", "They can be dynamically assigned", "They can be zone-redundant", "They are free"],
            pistas: ["Dynamic assignment belonged to the retired Basic SKU."],
            solucion: R`Standard public IPs are always static and support zones. They are billed by the hour.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Subnets:</strong> five reserved addresses (network, .1 gateway, .2 and .3 DNS, broadcast). Smallest /29. A /24 gives 251.`,
      R`<strong>Special subnets:</strong> GatewaySubnet, AzureBastionSubnet, AzureFirewallSubnet. Static private IPs are set on the NIC, never in the guest.`,
      R`<strong>Standard public IP:</strong> static, zone-capable, closed until an NSG allows. Basic is retired.`,
      R`<strong>Outbound:</strong> new subnets are private by default. Use a NAT gateway, LB outbound rules, a public IP or a firewall.`,
      R`<strong>Peering:</strong> regional or global, across subscriptions and tenants, no overlap, not transitive. Hub allows gateway transit, spoke uses remote gateways. Statuses Initiated, Connected, Disconnected.`,
      R`<strong>Routing:</strong> longest prefix, then UDR over BGP over system. One route table per subnet. Next hop None drops. NVAs need IP forwarding on the NIC.`,
      R`<strong>Troubleshooting:</strong> effective routes, Next hop, IP flow verify, effective security rules, Connection troubleshoot, packet capture.`
    ] }
  ]
});

LESSONS.push({
  id: "az-14", n: 14, fase: 4, codigo: "Network security",
  titulo: "Securing virtual networks",
  sub: "Filter traffic with network security groups, group servers with application security groups, reach VMs safely with Bastion, and reach PaaS services privately.",
  horas: "5 hours",
  contexto: "Network security for AZ-104. Network security groups: rules with priority 100 to 4096, source and destination (IP, service tag, application security group), port, protocol, allow or deny; default rules at 65000, 65001 and 65500; association with subnets and NICs and the order of evaluation (inbound subnet then NIC, outbound NIC then subnet); stateful; effective security rules; IP flow verify. Service tags such as Internet, VirtualNetwork, AzureLoadBalancer, Storage, Sql. Application security groups. Azure Bastion: AzureBastionSubnet /26 or larger, Standard static public IP, SKUs Developer, Basic, Standard, Premium, native client, shareable links, session recording. Service endpoints versus private endpoints, private DNS zones privatelink, service endpoint policies. Azure Firewall mentioned briefly. Official Labs 04 and 07.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">Inside a virtual network everything can talk to everything. Security means taking that freedom away selectively: deciding which traffic may reach each subnet and each machine, how administrators get in without exposing management ports to the internet, and how virtual machines reach platform services such as Storage without crossing the internet.</p>
<p>The workhorse is the <strong>network security group</strong>, a stateful packet filter at layers 3 and 4. Around it sit <strong>application security groups</strong>, which let rules refer to roles such as <em>web servers</em> instead of addresses; <strong>Azure Bastion</strong>, a managed jump host in the browser; and two ways to reach PaaS services privately, <strong>service endpoints</strong> and <strong>private endpoints</strong>.</p>
<div class="nota"><strong>An analogy from your field.</strong> A network security group is a stateful access control list on a router interface: five-tuple rules, first match wins, return traffic allowed automatically. The difference is that you can attach it both to the subnet, like the interface of the router, and to each network card, like a host firewall. Traffic must get past both.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Network security group rules</h3>
<p>Each rule has: <strong>priority</strong> (100 to 4096), <strong>source</strong> and <strong>destination</strong> (any, IP ranges, a service tag or an application security group), <strong>ports</strong>, <strong>protocol</strong> (TCP, UDP, ICMP or any), <strong>direction</strong> and <strong>action</strong> (allow or deny).</p>
<ul>
<li>Rules are processed in <strong>priority order, lowest number first</strong>. The first match decides and processing stops.</li>
<li>Network security groups are <strong>stateful</strong>. If an inbound connection is allowed, its return traffic is allowed automatically, whatever the outbound rules say.</li>
<li>A network security group must be in the same region as the resources it protects.</li>
</ul>
<p>Every network security group contains default rules you cannot delete, only override with a lower number:</p>
<div class="tabla"><table>
<thead><tr><th>Priority</th><th>Inbound</th><th>Outbound</th></tr></thead>
<tbody>
<tr><td>65000</td><td>AllowVNetInBound: from VirtualNetwork to VirtualNetwork</td><td>AllowVnetOutBound</td></tr>
<tr><td>65001</td><td>AllowAzureLoadBalancerInBound</td><td>AllowInternetOutBound</td></tr>
<tr><td>65500</td><td>DenyAllInBound</td><td>DenyAllOutBound</td></tr>
</tbody></table></div>
<p>So, by default: traffic inside the virtual network and peered networks is allowed, the load balancer's health probes are allowed, outbound internet is allowed, and <strong>inbound from the internet is denied</strong>.</p>

<h3>2. Service tags</h3>
<p>A service tag is a named group of address prefixes maintained by Microsoft. Use it instead of typing ranges that change.</p>
<div class="tabla"><table>
<thead><tr><th>Tag</th><th>Means</th></tr></thead>
<tbody>
<tr><td><code>VirtualNetwork</code></td><td>The address space of the network, peered networks, connected on-premises networks</td></tr>
<tr><td><code>Internet</code></td><td>Public address space outside Azure's own</td></tr>
<tr><td><code>AzureLoadBalancer</code></td><td>The source of health probes, 168.63.129.16</td></tr>
<tr><td><code>Storage</code>, <code>Sql</code>, <code>AzureMonitor</code>, and many more</td><td>The public addresses of a service, optionally per region, such as <code>Storage.WestEurope</code></td></tr>
</tbody></table></div>

<h3>3. Subnet and network interface</h3>
<p>A network security group can be associated with a subnet, with a network interface, or both. A subnet or interface has at most one. One network security group can be associated with many subnets and interfaces.</p>
<div class="tabla"><table>
<thead><tr><th>Direction</th><th>Evaluated first</th><th>Then</th></tr></thead>
<tbody>
<tr><td>Inbound</td><td>Subnet</td><td>Network interface</td></tr>
<tr><td>Outbound</td><td>Network interface</td><td>Subnet</td></tr>
</tbody></table></div>
<p>Traffic is allowed only if <strong>both</strong> allow it. A deny in either is the end. Microsoft recommends associating with the subnet, or with the interface, but not both, unless you have a reason, because the combination is harder to reason about.</p>
<p><strong>Effective security rules</strong> on a network interface shows the merged rules from both levels. <strong>IP flow verify</strong> tests a specific packet and names the rule that decided it.</p>

<h3>4. Application security groups</h3>
<ul>
<li>An application security group is a label you attach to network interfaces: <code>asg-web</code>, <code>asg-db</code>.</li>
<li>Network security group rules can use them as source or destination: allow from <code>asg-web</code> to <code>asg-db</code> on 1433.</li>
<li>When a new web server is added, you put its network interface in <code>asg-web</code> and it inherits the rules. No address in any rule changes.</li>
<li>All network interfaces in an application security group must be in the <strong>same virtual network</strong>. A rule that uses two groups needs both in the same network.</li>
</ul>

<h3>5. Azure Bastion</h3>
<p>Bastion gives RDP and SSH to your VMs from the Azure portal over TLS on port 443, so the VMs need <strong>no public IP</strong> and no open management ports to the internet.</p>
<ul>
<li>It is deployed in a subnet named exactly <code>AzureBastionSubnet</code>, <strong>/26 or larger</strong>, with a <strong>Standard static public IP</strong>.</li>
<li>One Bastion serves its own virtual network and <strong>peered</strong> networks.</li>
<li>The VMs' network security groups must allow RDP or SSH from the Bastion subnet, not from the internet.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>SKU</th><th>Notable for</th></tr></thead>
<tbody>
<tr><td><strong>Developer</strong></td><td>Free, one connection at a time, no dedicated subnet or public IP. Not for production. Does not serve peered networks</td></tr>
<tr><td><strong>Basic</strong></td><td>Fixed two instances, browser connections</td></tr>
<tr><td><strong>Standard</strong></td><td>Host scaling, native client (connect from your own RDP or SSH client), custom ports, shareable links, IP-based connection</td></tr>
<tr><td><strong>Premium</strong></td><td>Session recording and private-only deployment</td></tr>
</tbody></table></div>
<p>You can upgrade a SKU but not downgrade.</p>

<h3>6. Reaching PaaS services privately</h3>
<div class="tabla"><table>
<thead><tr><th></th><th>Service endpoint</th><th>Private endpoint</th></tr></thead>
<tbody>
<tr><td>What it is</td><td>A setting on a <strong>subnet</strong> for a service type, such as Microsoft.Storage</td><td>A <strong>network interface</strong> with a private IP from your subnet, connected to <strong>one specific resource</strong></td></tr>
<tr><td>Address of the service</td><td>Still its <strong>public</strong> endpoint</td><td>A <strong>private</strong> IP in your network</td></tr>
<tr><td>Path</td><td>Optimised route over the Azure backbone. The service sees your subnet as the source</td><td>Entirely inside your network</td></tr>
<tr><td>Restricting the service</td><td>Add a virtual network rule in the service's firewall</td><td>Disable public access on the service</td></tr>
<tr><td>From on premises or peered networks</td><td>No</td><td><strong>Yes</strong>, over VPN, ExpressRoute or peering</td></tr>
<tr><td>DNS</td><td>No change</td><td>A private DNS zone, such as <code>privatelink.blob.core.windows.net</code>, so the normal name resolves to the private IP</td></tr>
<tr><td>Cost</td><td>Free</td><td>Billed per hour and per gigabyte</td></tr>
</tbody></table></div>
<ul>
<li>Service endpoints secure access to <em>every</em> account of that type from the subnet. <strong>Service endpoint policies</strong> restrict it to specific storage accounts, to prevent data being copied to someone else's account.</li>
<li>A private endpoint is the answer whenever the question says <em>private IP</em>, <em>from on premises</em>, or <em>prevent data exfiltration to other accounts</em>.</li>
<li>Without the private DNS zone, the name still resolves to the public address and the private endpoint is not used.</li>
</ul>

<h3>7. Azure Firewall, in two lines</h3>
<p>Azure Firewall is a managed, stateful firewall service with network and application rules, FQDN filtering and threat intelligence, deployed in <code>AzureFirewallSubnet</code> and normally placed in a hub with user-defined routes sending traffic to it. Network security groups filter inside subnets. The firewall controls traffic between networks and to the internet. They are complementary.</p>
<div class="tabla"><pre>az network nsg create --resource-group rg1 --name nsg-web
az network nsg rule create --resource-group rg1 --nsg-name nsg-web --name allow-https --priority 100 --direction Inbound --access Allow --protocol Tcp --source-address-prefixes Internet --destination-port-ranges 443
az network asg create --resource-group rg1 --name asg-web
az network nic ip-config update --resource-group rg1 --nic-name vm1-nic --name ipconfig1 --application-security-groups asg-web
az network vnet subnet update --resource-group rg1 --vnet-name vnet1 --name web --network-security-group nsg-web --service-endpoints Microsoft.Storage
az network nic list-effective-nsg --resource-group rg1 --name vm1-nic</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 13. Filter, connect and go private</h3>
<p>This follows parts of the official Labs 04 and 07. Use the Bastion <strong>Developer</strong> SKU, which is free. A B1s VM costs about a cent per hour and a private endpoint about a cent per hour. Delete everything at the end.</p>
<h3>Part A. A VM with no public IP, through Bastion</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab13</code>, a virtual network with a subnet <code>app</code>, and an Ubuntu B1s VM <code>vm1</code> in it with <strong>no public IP</strong>.</li>
<li>On the VM, choose <strong>Connect</strong>, <strong>Bastion</strong>, and deploy the Developer SKU. Sign in through the browser.</li>
</ol>
<h3>Part B. Network security groups</h3>
<ol>
<li>Create a network security group <code>nsg-app</code> and associate it with the subnet. Read its six default rules, with <strong>Show default rules</strong> switched on.</li>
<li>Add an outbound rule, priority 200, deny, destination service tag <code>Internet</code>, any port. From the Bastion session, run <code>curl -I https://www.bing.com</code>. Then delete the rule and retry.</li>
<li>Open the VM's network interface, <strong>Effective security rules</strong>.</li>
<li>Open Network Watcher, <strong>IP flow verify</strong>: outbound, TCP, from the VM's private IP to 13.107.21.200 on port 443. Read which rule decides.</li>
</ol>
<h3>Part C. An application security group</h3>
<ol>
<li>Create an application security group <code>asg-app</code> and add the VM's network interface to it, under <strong>Networking</strong>, <strong>Application security groups</strong>.</li>
<li>In <code>nsg-app</code>, add an inbound rule allowing TCP 80 from VirtualNetwork to <code>asg-app</code>.</li>
</ol>
<h3>Part D. A private endpoint to Storage</h3>
<ol>
<li>Create a storage account. Under <strong>Networking</strong>, add a <strong>private endpoint</strong> for the blob sub-resource in the app subnet, accepting the private DNS zone integration.</li>
<li>From the Bastion session, run <code>nslookup ACCOUNT.blob.core.windows.net</code> and see the private address and the privatelink name.</li>
<li>Set Public network access to Disabled. Try to open a container from the portal over the internet and read the error.</li>
</ol>
<h3>Clean up</h3>
<p>Delete the resource group, including the Bastion host.</p>`,
      notas: [{ id: "lab13", label: "The rule IP flow verify named, and the address nslookup returned for the storage account" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Signed in to a VM without a public IP through Bastion." },
        { id: "t2", texto: "Default rules read and an outbound deny tested." },
        { id: "t3", texto: "Effective security rules and IP flow verify used." },
        { id: "t4", texto: "Application security group used in a rule." },
        { id: "t5", texto: "Private endpoint created and private name resolution confirmed." },
        { id: "t6", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Reading rules",
        enunciado: R`<p>The network security group NSG1 is associated with the subnet of VM1 and has these custom inbound rules, plus the defaults.</p>
<div class="tabla"><table>
<thead><tr><th>Priority</th><th>Name</th><th>Port</th><th>Source</th><th>Action</th></tr></thead>
<tbody>
<tr><td>100</td><td>Allow-RDP-Office</td><td>3389</td><td>203.0.113.0/24</td><td>Allow</td></tr>
<tr><td>200</td><td>Deny-RDP</td><td>3389</td><td>Any</td><td>Deny</td></tr>
<tr><td>300</td><td>Allow-HTTPS</td><td>443</td><td>Internet</td><td>Allow</td></tr>
</tbody></table></div>`,
        partes: [
          { id: "a", pregunta: "A user at 203.0.113.50 connects to VM1 on port 3389. Result?", tipo: "opcion", respuesta: 0,
            opciones: ["Allowed by Allow-RDP-Office", "Denied by Deny-RDP", "Denied by DenyAllInBound", "Allowed by AllowVNetInBound"],
            pistas: ["Lowest number first, first match wins."],
            solucion: R`Priority 100 matches first and allows it. Processing stops there.` },
          { id: "b", pregunta: "A user at 198.51.100.7 connects on port 3389. Result?", tipo: "opcion", respuesta: 1,
            opciones: ["Allowed by Allow-RDP-Office", "Denied by Deny-RDP", "Allowed by Allow-HTTPS", "Allowed by AllowVNetInBound"],
            pistas: ["Rule 100 does not match this source."],
            solucion: R`Rule 100 does not match, rule 200 matches and denies.` },
          { id: "c", pregunta: "A user at 198.51.100.7 connects on port 80. Result?", tipo: "opcion", respuesta: 2,
            opciones: ["Allowed by Allow-HTTPS", "Allowed by AllowInternetOutBound", "Denied by DenyAllInBound", "Allowed by AllowAzureLoadBalancerInBound"],
            pistas: ["No custom rule mentions port 80."],
            solucion: R`No custom rule matches, so the default DenyAllInBound at 65500 denies it.` },
          { id: "d", pregunta: "A VM in a peered virtual network connects to VM1 on port 8080. Result?", tipo: "opcion", respuesta: 3,
            opciones: ["Denied by Deny-RDP", "Denied by DenyAllInBound", "Allowed by Allow-HTTPS", "Allowed by AllowVNetInBound"],
            pistas: ["What does the VirtualNetwork service tag include?"],
            solucion: R`The VirtualNetwork tag includes peered networks, so AllowVNetInBound at 65000 allows it.` },
          { id: "e", pregunta: "VM1 answers an allowed HTTPS request. There is an outbound rule at priority 100 denying all traffic to Internet. Does the response reach the client?", tipo: "opcion", respuesta: 0,
            opciones: ["Yes, because network security groups are stateful", "No, the outbound deny blocks it", "Only if the client is in the VirtualNetwork tag", "Only with an application security group"],
            pistas: ["Return traffic of an allowed connection."],
            solucion: R`Network security groups track connections. The reply to an allowed inbound flow is allowed without an outbound rule.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Two levels",
        enunciado: R`<p>VM2 is in Subnet2. NSG-S is associated with Subnet2 and allows inbound TCP 80 from any source. NSG-N is associated with VM2's network interface and has only the default rules.</p>`,
        partes: [
          { id: "a", pregunta: "A client on the internet connects to VM2's public IP on port 80. Result?", tipo: "opcion", respuesta: 1,
            opciones: ["Allowed, because NSG-S allows it", "Denied, because NSG-N's default rules deny inbound internet traffic", "Allowed, because subnet rules override interface rules", "Allowed, because NSG-N has no custom rules"],
            pistas: ["Both levels must allow inbound traffic."],
            solucion: R`NSG-S allows it, then NSG-N evaluates it, and its DenyAllInBound default denies it. Both must allow.` },
          { id: "b", pregunta: "Where do you look to see the combined rules that apply to VM2 in a single view?", tipo: "opcion", respuesta: 2,
            opciones: ["The activity log", "Effective routes", "Effective security rules on the network interface", "The NSG-S overview"],
            pistas: ["It merges both levels for one interface."],
            solucion: R`Effective security rules shows the rules from the subnet and interface network security groups together.` },
          { id: "c", pregunta: "For inbound traffic, in which order are the two network security groups evaluated?", tipo: "opcion", respuesta: 0,
            opciones: ["NSG-S, then NSG-N", "NSG-N, then NSG-S", "By priority across both", "Only the one with the lowest priority rule"],
            pistas: ["Traffic arrives at the subnet before the network card."],
            solucion: R`Inbound: subnet first, then interface. Outbound is the reverse.` }
        ] },
      { id: "q3", nivel: 2, titulo: "ASGs and Bastion",
        enunciado: R`<p>A three-tier application has web, application and database servers in one virtual network. Servers are added and removed often.</p>`,
        partes: [
          { id: "a", pregunta: "You want rules that say web servers may reach application servers on 8443, without editing IP addresses when servers change. What do you use?", tipo: "opcion", respuesta: 3,
            opciones: ["Service tags", "Route tables", "A separate virtual network per tier", "Application security groups"],
            pistas: ["A label on network interfaces that rules can refer to."],
            solucion: R`Application security groups group network interfaces by role and can be used as source and destination in rules.` },
          { id: "b", pregunta: "A new database server is in a different virtual network, peered with the first. Can its network interface join the same application security group as the others?", tipo: "opcion", respuesta: 1,
            opciones: ["Yes, peering is enough", "No, all members must be in the same virtual network", "Yes, if the subscription is the same", "Only through Azure Firewall"],
            pistas: ["Application security groups have a network boundary."],
            solucion: R`All network interfaces in an application security group must belong to the same virtual network.` },
          { id: "c", pregunta: "Administrators must reach all servers with RDP and SSH without any VM having a public IP. Which TWO statements about the Basic or Standard Bastion deployment are true? Select two.", tipo: "multi", respuesta: [0, 2],
            opciones: ["It needs a subnet named AzureBastionSubnet, /26 or larger", "Each VM needs a public IP for Bastion to work", "It needs a Standard SKU public IP", "Users connect to each VM on port 3389 from the internet"],
            pistas: ["Bastion itself is the only thing with a public address."],
            solucion: R`Bastion lives in AzureBastionSubnet, /26 or larger, with a Standard public IP. Users connect over 443 to Bastion, and VMs need no public IP.` },
          { id: "d", pregunta: "Auditors require recordings of administrators' Bastion sessions. Which SKU?", tipo: "opcion", respuesta: 3,
            opciones: ["Developer", "Basic", "Standard", "Premium"],
            pistas: ["The top SKU."],
            solucion: R`Session recording is a Premium feature.` },
          { id: "e", pregunta: "Administrators want to use their own SSH client on their laptops, through Bastion. Which is the lowest SKU that supports it?", tipo: "opcion", respuesta: 2,
            opciones: ["Developer", "Basic", "Standard", "Premium"],
            pistas: ["The native client feature."],
            solucion: R`Native client support starts at Standard.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Service and private endpoints",
        enunciado: R`<p>VMs in the subnet Data, in VNet1, use the storage account stcontoso. Offices connect to VNet1 by VPN.</p>`,
        partes: [
          { id: "a", pregunta: "stcontoso must accept connections only from the Data subnet, at no extra cost. The account can keep its public endpoint. What do you configure?", tipo: "opcion", respuesta: 0,
            opciones: ["A service endpoint for Microsoft.Storage on Data, and a virtual network rule on stcontoso", "A private endpoint for stcontoso in Data", "A network security group on Data", "A route table on Data"],
            pistas: ["Free, and the public endpoint remains."],
            solucion: R`A service endpoint plus a virtual network rule in the storage firewall restricts access to that subnet at no charge.` },
          { id: "b", pregunta: "Users in the offices must reach stcontoso over the VPN, and public network access must be disabled. What do you configure?", tipo: "opcion", respuesta: 1,
            opciones: ["A service endpoint on the GatewaySubnet", "A private endpoint for stcontoso in VNet1, with a private DNS zone", "Allow gateway transit", "A shared access signature"],
            pistas: ["Service endpoints do not work from on premises."],
            solucion: R`A private endpoint gives stcontoso a private address reachable over the VPN. The private DNS zone makes its name resolve to that address.` },
          { id: "c", pregunta: "After creating the private endpoint, a VM resolves stcontoso.blob.core.windows.net to a public address. What is missing?", tipo: "opcion", respuesta: 2,
            opciones: ["A service endpoint", "IP forwarding", "A privatelink private DNS zone linked to VNet1", "A NAT gateway"],
            pistas: ["The private endpoint works by name."],
            solucion: R`The zone privatelink.blob.core.windows.net, linked to the virtual network, maps the name to the private IP.` },
          { id: "d", pregunta: "Security wants VMs in Data to reach stcontoso through the service endpoint, but not any other storage account, to prevent copying data out. What do you add?", tipo: "opcion", respuesta: 3,
            opciones: ["An application security group", "A Deny-Internet network security group rule", "A resource lock", "A service endpoint policy"],
            pistas: ["A policy attached to the service endpoint."],
            solucion: R`A service endpoint policy limits the endpoint to the storage accounts you list.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>NSG rules:</strong> priority 100 to 4096, lowest first, first match wins. Stateful. Same region as the resources.`,
      R`<strong>Defaults:</strong> 65000 allow VirtualNetwork, 65001 allow AzureLoadBalancer inbound and Internet outbound, 65500 deny all. Inbound internet is denied by default.`,
      R`<strong>Two levels:</strong> inbound subnet then NIC, outbound NIC then subnet. Both must allow. Check with effective security rules and IP flow verify.`,
      R`<strong>Application security groups:</strong> labels on NICs used in rules. Members must be in one virtual network.`,
      R`<strong>Bastion:</strong> AzureBastionSubnet /26+, Standard public IP, serves peered networks. Developer free, Standard adds native client and shareable links, Premium adds recording.`,
      R`<strong>Service endpoint:</strong> subnet setting, public endpoint kept, free, not from on premises. Restrict accounts with a service endpoint policy.`,
      R`<strong>Private endpoint:</strong> private IP for one resource, works from on premises and peered networks, needs a privatelink private DNS zone, billed.`
    ] }
  ]
});

LESSONS.push({
  id: "az-15", n: 15, fase: 4, codigo: "DNS and load balancing",
  titulo: "Azure DNS and load balancing",
  sub: "Host public and private DNS zones in Azure, then distribute traffic with a public or internal load balancer and find out why it does not.",
  horas: "4 hours",
  contexto: "Azure DNS: public zones, delegation with NS records at the registrar, record sets, alias records (apex to public IP, Traffic Manager, Front Door), TTL. Private DNS zones: virtual network links, auto-registration, one auto-registration zone per VNet, Azure-provided DNS 168.63.129.16, custom DNS servers on the VNet. Azure Load Balancer: layer 4, Standard SKU (Basic retired 30 September 2025), public and internal, frontend IP, backend pool, health probes (TCP, HTTP, HTTPS), load-balancing rules, inbound NAT rules, outbound rules, session persistence (none, client IP, client IP and protocol), HA ports, secure by default with NSG. Troubleshooting probes and NSGs. Comparison with Application Gateway, Traffic Manager and Front Door. Official Lab 06.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">This lesson joins two services that both answer the question <em>where does a client's request end up?</em> DNS answers it by name: <code>www.contoso.com</code> becomes an address. A load balancer answers it by address: one frontend address becomes one of several healthy servers behind it.</p>
<p><strong>Azure DNS</strong> hosts your zones on Microsoft's name servers. <strong>Public zones</strong> answer the internet. <strong>Private zones</strong> answer only inside the virtual networks you link to them, which is how VMs find each other, and private endpoints, by name.</p>
<p><strong>Azure Load Balancer</strong> works at layer 4. It sees addresses, protocols and ports, not URLs. It distributes flows across a backend pool and stops sending to any server that fails its health probe.</p>
<div class="nota"><strong>Both familiar.</strong> DNS delegation with NS records and the A, CNAME, MX and TXT records are exactly what you know. A layer 4 load balancer with a five-tuple hash and health checks is the same idea as the ones in any operator's data centre. What the exam adds is Azure's names for the pieces, a few Azure-only record features, and the rule that Standard load balancers are closed until a network security group opens them.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Public DNS zones</h3>
<ul>
<li>A DNS zone resource holds the records for one domain, such as <code>contoso.com</code>. Azure gives it four name servers.</li>
<li>Azure DNS does <strong>not register domains</strong>. You buy the domain from a registrar and then <strong>delegate</strong> it: at the registrar, set the domain's name servers to the four Azure name servers.</li>
<li>For a subdomain such as <code>eu.contoso.com</code> in its own zone, create an <strong>NS record</strong> named <code>eu</code> in the parent zone pointing to the child zone's name servers.</li>
<li>Records are grouped in <strong>record sets</strong>: all records with the same name and type, sharing one TTL.</li>
<li>Supported types include A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT and CAA.</li>
<li>A CNAME cannot be created at the zone apex and cannot coexist with other records of the same name.</li>
</ul>
<p><strong>Alias records</strong> are an Azure feature: an A, AAAA or CNAME record set that points to an <strong>Azure resource</strong> instead of a fixed value, such as a public IP address, a Traffic Manager profile or a Front Door endpoint. If the resource's address changes, the record follows. An alias A record can sit at the <strong>apex</strong>, which solves the problem of pointing <code>contoso.com</code> itself at an Azure service.</p>

<h3>2. Private DNS zones</h3>
<ul>
<li>A private zone, such as <code>corp.contoso.com</code>, is resolvable only from the virtual networks you <strong>link</strong> to it.</li>
<li>A link can enable <strong>auto-registration</strong>: VMs in that network automatically get A records with their names, kept up to date as they come and go.</li>
<li>A virtual network can be linked to many private zones for resolution, but to <strong>only one</strong> with auto-registration.</li>
<li>A private zone can be linked to many networks, including networks in other regions and subscriptions. Peered networks do not inherit links: link each one.</li>
<li>Private endpoints use zones named <code>privatelink.SERVICE</code>, as in the previous lesson.</li>
</ul>
<p>By default VMs use <strong>Azure-provided DNS</strong> at 168.63.129.16, which resolves public names and the names of VMs in the same network. You can instead set <strong>custom DNS servers</strong> on the virtual network, for example domain controllers. VMs pick up a change at their next DHCP renewal, so restart them.</p>
<div class="tabla"><pre>az network dns zone create --resource-group rg1 --name contoso.com
az network dns record-set a add-record --resource-group rg1 --zone-name contoso.com --record-set-name www --ipv4-address 20.50.1.10
az network dns zone show --resource-group rg1 --name contoso.com --query nameServers
az network private-dns zone create --resource-group rg1 --name corp.contoso.com
az network private-dns link vnet create --resource-group rg1 --zone-name corp.contoso.com --name link1 --virtual-network vnet1 --registration-enabled true
nslookup www.contoso.com ns1-01.azure-dns.com</pre></div>

<h3>3. Azure Load Balancer</h3>
<div class="tabla"><table>
<thead><tr><th>Piece</th><th>What it is</th></tr></thead>
<tbody>
<tr><td><strong>Frontend IP configuration</strong></td><td>The address clients connect to. Public for a <strong>public load balancer</strong>, private from a subnet for an <strong>internal load balancer</strong></td></tr>
<tr><td><strong>Backend pool</strong></td><td>The VMs or scale set instances that receive traffic, by network interface or by IP address, all in <strong>one virtual network</strong></td></tr>
<tr><td><strong>Health probe</strong></td><td>TCP, HTTP or HTTPS check on each backend. Unhealthy instances stop receiving new flows</td></tr>
<tr><td><strong>Load-balancing rule</strong></td><td>Frontend IP and port, to backend pool and port, using a probe</td></tr>
<tr><td><strong>Inbound NAT rule</strong></td><td>One frontend port to one specific VM, such as frontend 50001 to VM1 port 22</td></tr>
<tr><td><strong>Outbound rule</strong></td><td>Outbound internet access for the backend pool through the frontend's public IPs</td></tr>
</tbody></table></div>
<ul>
<li>A <strong>public</strong> load balancer distributes internet traffic to VMs. An <strong>internal</strong> one distributes traffic inside a network, typically from a web tier to an application tier, or from on premises.</li>
<li>Use the <strong>Standard SKU</strong>. The Basic SKU was retired on 30 September 2025. Standard supports zones, up to 1,000 backend instances, HTTPS probes, outbound rules and an SLA.</li>
<li>A Standard load balancer is <strong>secure by default</strong>: inbound traffic to the backends must be allowed by a network security group on their subnet or interfaces.</li>
<li>Health probes come from <strong>168.63.129.16</strong>, the <code>AzureLoadBalancer</code> service tag. A network security group that blocks that tag makes every backend look unhealthy.</li>
<li>An HTTP probe considers a backend healthy only on <strong>200 OK</strong>.</li>
<li><strong>HA ports</strong>, on an internal Standard load balancer, balance all ports and protocols in one rule, typically for network virtual appliances.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>Session persistence</th><th>Hash on</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><strong>None</strong>, the default</td><td>Five-tuple: source IP and port, destination IP and port, protocol</td><td>Each new connection can reach a different backend</td></tr>
<tr><td><strong>Client IP</strong></td><td>Two-tuple: source and destination IP</td><td>The same client always reaches the same backend</td></tr>
<tr><td><strong>Client IP and protocol</strong></td><td>Three-tuple</td><td>The same, per protocol</td></tr>
</tbody></table></div>

<h3>4. When it does not balance</h3>
<ol>
<li><strong>Probes failing:</strong> check the probe port and path, the application listening on that port, the guest firewall, and network security groups allowing <code>AzureLoadBalancer</code>.</li>
<li><strong>Traffic blocked:</strong> with Standard, a network security group must allow the client traffic to the backend port.</li>
<li><strong>Testing an internal load balancer from a backend VM:</strong> a backend calling its own load balancer's frontend may reach itself. Test from a VM outside the pool.</li>
<li><strong>Uneven distribution:</strong> session persistence or a few clients with long connections.</li>
<li>Use the load balancer's <strong>Insights</strong> and the metrics <em>Health probe status</em> and <em>Data path availability</em>.</li>
</ol>

<h3>5. The other traffic services</h3>
<div class="tabla"><table>
<thead><tr><th>Service</th><th>Layer</th><th>Scope</th><th>Choose it for</th></tr></thead>
<tbody>
<tr><td><strong>Load Balancer</strong></td><td>4, TCP and UDP</td><td>Regional</td><td>Any protocol, very high performance, internal or public</td></tr>
<tr><td><strong>Application Gateway</strong></td><td>7, HTTP and HTTPS</td><td>Regional</td><td>Routing by URL path or host name, TLS termination, cookie affinity, Web Application Firewall</td></tr>
<tr><td><strong>Traffic Manager</strong></td><td>DNS</td><td>Global</td><td>Sending users to the closest or a healthy region by name resolution, any protocol</td></tr>
<tr><td><strong>Front Door</strong></td><td>7</td><td>Global</td><td>Global HTTP entry point with caching, acceleration and Web Application Firewall</td></tr>
</tbody></table></div>
<p>The decision words: <em>URL path</em> or <em>WAF</em> means Application Gateway or Front Door; <em>non-HTTP</em> or <em>UDP</em> means Load Balancer; <em>several regions</em> means Traffic Manager or Front Door.</p>
<div class="tabla"><pre>az network lb create --resource-group rg1 --name lb-web --sku Standard --public-ip-address pip-lb --frontend-ip-name fe --backend-pool-name be
az network lb probe create --resource-group rg1 --lb-name lb-web --name http-probe --protocol Http --port 80 --path /
az network lb rule create --resource-group rg1 --lb-name lb-web --name http --protocol Tcp --frontend-port 80 --backend-port 80 --frontend-ip-name fe --backend-pool-name be --probe-name http-probe
az network nic ip-config address-pool add --resource-group rg1 --nic-name vm1-nic --ip-config-name ipconfig1 --lb-name lb-web --address-pool be</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 14. A private zone and a load balancer</h3>
<p>This follows the official Lab 06 and the DNS part of Lab 04. Two B1s VMs and a Standard load balancer cost a few cents per hour. A public DNS zone costs about 50 cents per month. Delete everything the same day.</p>
<h3>Part A. Two web servers</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab14</code> and a virtual network with a subnet <code>web</code>.</li>
<li>Create two Ubuntu B1s VMs, <code>web1</code> and <code>web2</code>, without public IPs, in an availability set or in zones 1 and 2. In Advanced, Custom data, paste:</li>
</ol>
<div class="tabla"><pre>#cloud-config
package_upgrade: false
packages:
  - nginx
runcmd:
  - hostname | sudo tee /var/www/html/index.html</pre></div>
<p>Each server will answer with its own name.</p>
<h3>Part B. The load balancer</h3>
<ol>
<li>Create a <strong>Standard, public</strong> load balancer <code>lb-web</code> with a new public IP.</li>
<li>Add a backend pool with both VMs, a health probe HTTP on port 80 path /, and a load-balancing rule TCP 80 to 80.</li>
<li>Create a network security group on the web subnet allowing TCP 80 from Internet.</li>
<li>Open the frontend IP in a browser. Refresh with Ctrl+F5 several times, or use a private window, and watch the name change.</li>
<li>Stop web1. Watch <strong>Insights</strong> or the health probe metric, and see that all traffic goes to web2.</li>
</ol>
<h3>Part C. A private DNS zone</h3>
<ol>
<li>Create a private DNS zone <code>lab14.internal</code> and link it to the virtual network with <strong>auto-registration</strong> enabled.</li>
<li>Open the zone and see the A records for web1 and web2 appear.</li>
<li>From web2's Run command, run <code>nslookup web1.lab14.internal</code>.</li>
</ol>
<h3>Part D. A public zone, optional</h3>
<p>Create a public DNS zone for any name, for example <code>lab14-UNIQUE.com</code>. Add an <strong>alias</strong> A record at the apex pointing to the load balancer's public IP. Query it with <code>nslookup lab14-UNIQUE.com</code> plus one of the zone's name servers. Nobody else can resolve it, because the domain is not delegated.</p>
<h3>Clean up</h3>
<p>Delete the resource group.</p>`,
      notas: [{ id: "lab14", label: "Which names the browser showed, what happened when web1 stopped, and the records auto-registration created" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Two web servers deployed with cloud-init." },
        { id: "t2", texto: "Public Standard load balancer with probe and rule distributing traffic." },
        { id: "t3", texto: "Failover observed when one backend stopped." },
        { id: "t4", texto: "Private zone with auto-registration resolving VM names." },
        { id: "t5", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Public DNS",
        enunciado: R`<p>You bought contoso.com from an external registrar and created a public DNS zone for it in Azure.</p>`,
        partes: [
          { id: "a", pregunta: "Internet users still cannot resolve records in the zone. What must you do?", tipo: "opcion", respuesta: 2,
            opciones: ["Link the zone to a virtual network", "Enable auto-registration", "Change the name servers at the registrar to the four Azure DNS name servers", "Create a CNAME at the apex"],
            pistas: ["The rest of the internet must be told who is authoritative."],
            solucion: R`Delegation: at the registrar, replace the domain's name servers with the ones Azure assigned to the zone.` },
          { id: "b", pregunta: "The root, contoso.com, must point at a public IP address of an Azure resource and follow it if it changes. What do you create?", tipo: "opcion", respuesta: 1,
            opciones: ["A CNAME record at the apex", "An alias A record at the apex targeting the public IP resource", "An NS record", "A TXT record"],
            pistas: ["CNAMEs are not allowed at the apex."],
            solucion: R`An alias record points to the Azure resource itself and is allowed at the apex.` },
          { id: "c", pregunta: "You want eu.contoso.com managed in its own Azure zone by another team. What do you add to the contoso.com zone?", tipo: "opcion", respuesta: 0,
            opciones: ["An NS record named eu with the child zone's name servers", "A CNAME named eu", "An A record named eu", "A virtual network link"],
            pistas: ["Delegating a subdomain is the same mechanism as delegating the domain."],
            solucion: R`An NS record in the parent zone delegates the subdomain to the child zone's name servers.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Private DNS",
        enunciado: R`<p>You create a private DNS zone, corp.local, and three virtual networks: VNet1, VNet2 and VNet3. VNet1 and VNet2 are peered.</p>`,
        partes: [
          { id: "a", pregunta: "VMs in VNet1 must register their names in corp.local automatically. What do you configure?", tipo: "opcion", respuesta: 3,
            opciones: ["A custom DNS server on VNet1", "An A record for each VM", "Peering with auto-registration", "A virtual network link from corp.local to VNet1 with auto-registration enabled"],
            pistas: ["Auto-registration is a setting of the link."],
            solucion: R`Link the zone to VNet1 and enable auto-registration on the link.` },
          { id: "b", pregunta: "VMs in VNet2 must resolve names in corp.local. VNet2 is peered with VNet1, which is linked. What do you need?", tipo: "opcion", respuesta: 1,
            opciones: ["Nothing, peering shares DNS links", "A virtual network link from corp.local to VNet2", "Allow gateway transit", "A public DNS zone"],
            pistas: ["Links are not inherited through peering."],
            solucion: R`Each network that must resolve the zone needs its own link, here a resolution-only link.` },
          { id: "c", pregunta: "VNet3 already has auto-registration enabled on a link to the zone apps.local. Can you enable auto-registration on a link from corp.local to VNet3?", tipo: "opcion", respuesta: 2,
            opciones: ["Yes, without limit", "Yes, if the zones are in the same resource group", "No, a virtual network can have only one auto-registration zone", "No, a private zone can be linked to only one virtual network"],
            pistas: ["The limit is on the network side."],
            solucion: R`A virtual network can be registered in only one private zone. It can still be linked to corp.local for resolution.` },
          { id: "d", pregunta: "You change the DNS servers setting of VNet1 to your domain controllers. Existing VMs keep using Azure DNS. Why?", tipo: "opcion", respuesta: 0,
            opciones: ["VMs pick up DNS settings at DHCP renewal, so they must be restarted", "Custom DNS only applies to new subnets", "Peering overrides the setting", "The setting needs a private DNS zone"],
            pistas: ["DNS servers reach VMs through DHCP."],
            solucion: R`DNS server settings are delivered by DHCP. Restart the VMs or renew their leases.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Load balancer design",
        enunciado: R`<p>Choose the right configuration for each requirement.</p>`,
        partes: [
          { id: "a", pregunta: "Web servers must call a pool of application servers on TCP 8080 through a single private address. Which load balancer?", tipo: "opcion", respuesta: 1,
            opciones: ["A public load balancer", "An internal load balancer", "Traffic Manager", "Front Door"],
            pistas: ["Private frontend address."],
            solucion: R`An internal load balancer has a private frontend IP from a subnet.` },
          { id: "b", pregunta: "Administrators must reach SSH on VM1 through the public load balancer's address on port 50001, and VM2 on 50002. What do you create?", tipo: "opcion", respuesta: 3,
            opciones: ["Load-balancing rules", "Outbound rules", "Health probes", "Inbound NAT rules"],
            pistas: ["One frontend port to one specific VM."],
            solucion: R`Inbound NAT rules map a frontend port to one backend VM and port.` },
          { id: "c", pregunta: "A shopping application keeps the session in memory, so every client must keep reaching the same backend. What do you set on the rule?", tipo: "opcion", respuesta: 2,
            opciones: ["Session persistence None", "Floating IP", "Session persistence Client IP", "An HTTPS probe"],
            pistas: ["Hash on fewer fields."],
            solucion: R`Client IP persistence hashes on source and destination IP, so a client always lands on the same backend.` },
          { id: "d", pregunta: "Requests to /images must go to one pool and /api to another, with a Web Application Firewall. What do you use?", tipo: "opcion", respuesta: 0,
            opciones: ["Application Gateway", "Azure Load Balancer", "Traffic Manager", "An inbound NAT rule"],
            pistas: ["Load Balancer cannot see URLs."],
            solucion: R`Application Gateway works at layer 7 with path-based routing and WAF. A layer 4 load balancer cannot see the path.` },
          { id: "e", pregunta: "A game server uses UDP and runs in two regions. Players must be sent to a healthy region. Which TWO services together fit? Select two.", tipo: "multi", respuesta: [1, 2],
            opciones: ["Application Gateway in each region", "Azure Load Balancer in each region", "Traffic Manager in front of both", "Front Door in front of both"],
            pistas: ["UDP rules out the layer 7 services."],
            solucion: R`A regional Load Balancer handles UDP in each region, and Traffic Manager, working by DNS, sends players to a healthy region whatever the protocol.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Troubleshooting the load balancer",
        enunciado: R`<p>A Standard public load balancer has a rule for TCP 80 and an HTTP health probe on port 80, path /health. The two backend VMs run a web server on port 80. A network security group is associated with the backend subnet.</p>`,
        partes: [
          { id: "a", pregunta: "Both backends show as unhealthy. The network security group has a rule at priority 100 denying all inbound traffic except from the office. Which TWO changes are needed for the site to work from the internet? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["Allow inbound from the AzureLoadBalancer service tag", "Change the load balancer to an internal one", "Delete the health probe", "Allow inbound TCP 80 from Internet"],
            pistas: ["Probes come from a service tag.", "Standard load balancers are closed by default."],
            solucion: R`The probes need AzureLoadBalancer allowed above the deny rule, and client traffic needs TCP 80 allowed from Internet.` },
          { id: "b", pregunta: "The network is fixed. One backend is healthy, the other unhealthy. Its web server answers / with 200 but /health with 404. What happens?", tipo: "opcion", respuesta: 1,
            opciones: ["The probe treats 404 as healthy", "The probe marks it unhealthy because only 200 counts", "The load balancer redirects to /", "The rule stops for both backends"],
            pistas: ["An HTTP probe has one definition of healthy."],
            solucion: R`An HTTP probe considers only 200 OK as healthy. Fix the path or the application.` },
          { id: "c", pregunta: "Which IP address must the backends accept probes from?", tipo: "opcion", respuesta: 2,
            opciones: ["The frontend public IP", "10.0.0.1", "168.63.129.16", "The address of the office"],
            pistas: ["The same address Azure uses for DNS and the VM agent."],
            solucion: R`Health probes come from 168.63.129.16, represented by the AzureLoadBalancer service tag.` },
          { id: "d", pregunta: "You test an internal load balancer from one of its own backend VMs and get inconsistent results. What is the advice?", tipo: "opcion", respuesta: 0,
            opciones: ["Test from a VM that is not in the backend pool", "Enable Client IP persistence", "Add a public IP to the VM", "Use an HTTPS probe"],
            pistas: ["A backend calling its own frontend can be sent to itself."],
            solucion: R`A backend VM calling its own load balancer may reach itself. Test from a client outside the pool.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Public zone:</strong> Azure hosts, it does not register. Delegate with NS at the registrar. Subdomains delegated with NS records in the parent zone.`,
      R`<strong>Alias records:</strong> point to an Azure resource, follow its changes, allowed at the apex.`,
      R`<strong>Private zone:</strong> works only in linked networks. Peering does not share links. One auto-registration zone per network. Custom DNS servers need a VM restart.`,
      R`<strong>Load Balancer:</strong> layer 4, Standard SKU, public or internal. Frontend, backend pool in one VNet, probe, rule, inbound NAT rule, outbound rule.`,
      R`<strong>Secure by default:</strong> an NSG must allow client traffic, and probes from AzureLoadBalancer, 168.63.129.16. HTTP probes need 200.`,
      R`<strong>Persistence:</strong> None (5-tuple), Client IP (2-tuple), Client IP and protocol (3-tuple).`,
      R`<strong>Choose:</strong> Load Balancer for any protocol in a region, Application Gateway for URLs and WAF, Traffic Manager for DNS across regions, Front Door for global HTTP.`
    ] }
  ]
});


LESSONS.push({
  id: "az-16", n: 16, fase: 5, codigo: "Azure Monitor",
  titulo: "Azure Monitor: metrics, logs and alerts",
  sub: "Collect what your resources report, query it with KQL, raise alerts that reach the right people, and use Insights and Network Watcher to see inside.",
  horas: "5 hours",
  contexto: "Azure Monitor for AZ-104. Data types: metrics (numeric time series, platform metrics kept 93 days), logs (Log Analytics workspace, KQL), activity log (control plane, 90 days), resource logs (need diagnostic settings). Diagnostic settings destinations: Log Analytics, storage account, Event Hubs, partner solutions. Azure Monitor Agent and data collection rules for guest OS data. KQL operators: where, project, extend, summarize, count, bin, ago, order by, take, render; tables Heartbeat, Perf, Event, Syslog, AzureActivity, AzureDiagnostics. Alerts: rule (scope, condition, actions, severity 0 to 4), signal types metric, log search, activity log, resource health, service health; action groups (notifications and actions); alert processing rules (suppress or add action groups); alert states. Insights: VM insights, Storage insights, Network insights. Network Watcher: Connection monitor, VNet flow logs (NSG flow logs retire 30 September 2027), traffic analytics, the diagnostic tools. Official Lab 11.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">Every Azure resource produces data about itself. Azure Monitor is the single service that collects it, stores it, lets you query it and acts when something crosses a line. The exam expects you to know where each kind of data lives, how to send more of it somewhere useful, and how to turn a condition into a notification.</p>
<p>There are two shapes of data. <strong>Metrics</strong> are numbers sampled over time: CPU percentage, bytes in, requests per second. They are light, fast and kept for 93 days. <strong>Logs</strong> are records with many fields: an event, a sign-in, a firewall decision. They live in a <strong>Log Analytics workspace</strong> and you query them with the <strong>Kusto Query Language</strong>, KQL.</p>
<p>Then there is the chain that wakes someone up at three in the morning: an <strong>alert rule</strong> watches a signal, fires, and calls an <strong>action group</strong>, which sends an email or SMS or runs some automation. An <strong>alert processing rule</strong> can silence or redirect that chain, for example during planned maintenance.</p>
<div class="nota"><strong>An analogy from your field.</strong> Metrics are the SNMP counters on your network elements, polled and graphed. Logs are the syslog stream into your SIEM, where you search by field. The alert rule is the threshold in your NMS, the action group is the escalation list, and the alert processing rule is the maintenance window that stops the pager during a planned intervention.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Where each kind of data lives</h3>
<div class="tabla"><table>
<thead><tr><th>Data</th><th>What it records</th><th>Collected</th><th>Kept</th></tr></thead>
<tbody>
<tr><td><strong>Platform metrics</strong></td><td>Numeric values from each resource</td><td>Automatically</td><td>93 days</td></tr>
<tr><td><strong>Activity log</strong></td><td>Control plane operations on the subscription: who created, changed, deleted what, plus service health events</td><td>Automatically</td><td>90 days</td></tr>
<tr><td><strong>Resource logs</strong></td><td>What happens inside a resource: storage requests, Key Vault access, firewall decisions</td><td><strong>Only with a diagnostic setting</strong></td><td>Wherever you send them</td></tr>
<tr><td><strong>Guest OS data</strong></td><td>Performance counters, Windows events, Linux syslog from inside VMs</td><td>Only with the <strong>Azure Monitor Agent</strong> and a <strong>data collection rule</strong></td><td>In the workspace</td></tr>
<tr><td><strong>Microsoft Entra logs</strong></td><td>Sign-ins and directory audit</td><td>Kept briefly in Entra. Longer with a diagnostic setting</td><td>Depends</td></tr>
</tbody></table></div>

<h3>2. Diagnostic settings</h3>
<p>A diagnostic setting on a resource, or on the subscription for the activity log, sends chosen log categories and metrics to one or more destinations:</p>
<div class="tabla"><table>
<thead><tr><th>Destination</th><th>Choose it to</th></tr></thead>
<tbody>
<tr><td><strong>Log Analytics workspace</strong></td><td>Query with KQL, alert on logs, use Insights and workbooks</td></tr>
<tr><td><strong>Storage account</strong></td><td>Archive cheaply for audits, for years</td></tr>
<tr><td><strong>Event Hubs</strong></td><td>Stream to a third-party SIEM or another system</td></tr>
<tr><td><strong>Partner solution</strong></td><td>Send to an integrated partner monitoring service</td></tr>
</tbody></table></div>
<ul>
<li>One resource can have several diagnostic settings, each to different destinations.</li>
<li>Sending the activity log to a workspace lets you keep it beyond 90 days and query it with the <code>AzureActivity</code> table.</li>
<li>Platform metrics can also be sent to a workspace, to query them alongside logs.</li>
</ul>

<h3>3. Log Analytics and KQL</h3>
<p>A workspace is a resource in a region. Its <strong>retention</strong> is set per workspace and per table. Access can be by workspace permissions or by resource permissions, the access control mode.</p>
<p>A KQL query starts with a table and passes rows through operators separated by the pipe character.</p>
<div class="tabla"><pre>Heartbeat
| where TimeGenerated > ago(15m)
| summarize LastBeat = max(TimeGenerated) by Computer

Perf
| where ObjectName == "Processor" and CounterName == "% Processor Time"
| where TimeGenerated > ago(1h)
| summarize AvgCPU = avg(CounterValue) by Computer, bin(TimeGenerated, 5m)
| render timechart

AzureActivity
| where OperationNameValue endswith "DELETE"
| project TimeGenerated, Caller, ResourceGroup, OperationNameValue
| order by TimeGenerated desc
| take 20

Event
| where EventLevelName == "Error"
| summarize count() by Source
| top 5 by count_</pre></div>
<div class="tabla"><table>
<thead><tr><th>Operator</th><th>Does</th></tr></thead>
<tbody>
<tr><td><code>where</code></td><td>Filters rows</td></tr>
<tr><td><code>project</code></td><td>Chooses, renames or computes columns, dropping the others</td></tr>
<tr><td><code>extend</code></td><td>Adds a computed column, keeping the others</td></tr>
<tr><td><code>summarize ... by</code></td><td>Aggregates: <code>count()</code>, <code>avg()</code>, <code>max()</code>, <code>dcount()</code>, grouped by columns</td></tr>
<tr><td><code>bin(TimeGenerated, 5m)</code></td><td>Groups timestamps into intervals</td></tr>
<tr><td><code>ago(1h)</code></td><td>A time relative to now</td></tr>
<tr><td><code>order by</code>, <code>sort by</code>, <code>top</code>, <code>take</code></td><td>Order and limit</td></tr>
<tr><td><code>render</code></td><td>Draws a chart</td></tr>
</tbody></table></div>
<p>Useful tables: <code>Heartbeat</code> (is the agent alive), <code>Perf</code>, <code>Event</code> (Windows), <code>Syslog</code> (Linux), <code>AzureActivity</code>, <code>AzureDiagnostics</code> and resource-specific tables such as <code>StorageBlobLogs</code>, <code>InsightsMetrics</code> (VM insights).</p>

<h3>4. Alerts</h3>
<p>An <strong>alert rule</strong> has a <strong>scope</strong> (the resources watched), a <strong>condition</strong> (the signal and logic), <strong>actions</strong> (action groups), a <strong>severity</strong> and details.</p>
<div class="tabla"><table>
<thead><tr><th>Signal type</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Metric</strong></td><td>Average CPU above 85% for 15 minutes. Can cover many VMs in one rule. Stateful: resolves itself when the condition clears</td></tr>
<tr><td><strong>Log search</strong></td><td>A KQL query run on a schedule, firing when the number of rows or a value crosses a threshold</td></tr>
<tr><td><strong>Activity log</strong></td><td>Someone deletes a VM, or a policy assignment is created</td></tr>
<tr><td><strong>Resource health</strong></td><td>A specific resource becomes unavailable</td></tr>
<tr><td><strong>Service health</strong></td><td>Azure announces an incident or planned maintenance in your regions</td></tr>
</tbody></table></div>
<ul>
<li>Severity goes from <strong>Sev 0, critical</strong>, to <strong>Sev 4, verbose</strong>.</li>
<li>Metric alerts can use a <strong>static</strong> threshold or a <strong>dynamic</strong> one learned from history.</li>
<li>A fired alert has a <strong>monitor condition</strong>, Fired or Resolved, set by the system, and a <strong>user response</strong>, New, Acknowledged or Closed, set by people.</li>
<li>Alert rules are billed per rule and per monitored time series.</li>
</ul>

<h3>5. Action groups and alert processing rules</h3>
<p>An <strong>action group</strong> is a reusable list of what to do when an alert fires:</p>
<ul>
<li><strong>Notifications:</strong> email, SMS, push to the Azure mobile app, voice call, or email to an Azure Resource Manager role, such as all Owners of the subscription.</li>
<li><strong>Actions:</strong> Automation runbook, Azure Function, Logic App, webhook, secure webhook, ITSM connector, Event Hub.</li>
</ul>
<p>Many alert rules can use the same action group, and one rule can call several. Rate limits apply to SMS, voice and email.</p>
<p>An <strong>alert processing rule</strong> acts on alerts after they fire, across a scope such as a resource group or subscription:</p>
<ul>
<li><strong>Suppress notifications</strong>: alerts still fire and are recorded, but no action group runs. Typical for a maintenance window, one-off or recurring.</li>
<li><strong>Apply action groups</strong>: add an action group to every alert in a scope, without editing each rule.</li>
<li>It can be filtered by severity, alert rule, resource type and more.</li>
</ul>

<h3>6. Insights</h3>
<div class="tabla"><table>
<thead><tr><th>Insight</th><th>Shows</th><th>Needs</th></tr></thead>
<tbody>
<tr><td><strong>VM insights</strong></td><td>Performance charts across VMs and an optional <strong>map</strong> of processes and connections</td><td>Azure Monitor Agent, a data collection rule, a workspace</td></tr>
<tr><td><strong>Storage insights</strong></td><td>Capacity, availability, transactions and latency of storage accounts</td><td>Nothing: built on platform metrics</td></tr>
<tr><td><strong>Network insights</strong></td><td>Health and metrics of network resources, topology, Connection monitor and traffic</td><td>Nothing for the basics</td></tr>
</tbody></table></div>
<p><strong>Workbooks</strong> combine queries, metrics and text into interactive reports. <strong>Dashboards</strong> pin charts in the portal.</p>

<h3>7. Network Watcher monitoring</h3>
<p>You met the diagnostic tools in lesson 13. These are the monitoring ones:</p>
<ul>
<li><strong>Connection monitor</strong>: continuous tests between sources (Azure VMs, scale sets, on-premises machines with the agent) and destinations (VMs, URLs, IPs), reporting reachability, latency and packet loss over time, with alerts. Use it when the question says <em>continuously</em> or <em>over time</em>. Connection troubleshoot is the one-off check.</li>
<li><strong>Virtual network flow logs</strong>: record IP flows through a virtual network into a storage account. They replace <strong>NSG flow logs</strong>, which can no longer be created and retire on 30 September 2027.</li>
<li><strong>Traffic analytics</strong>: processes flow logs in a Log Analytics workspace to show who talks to whom, top talkers and blocked traffic.</li>
</ul>
<div class="tabla"><pre>az monitor metrics list --resource VM_ID --metric "Percentage CPU" --interval PT5M
az monitor diagnostic-settings create --name to-law --resource STORAGE_BLOB_SERVICE_ID --workspace WORKSPACE_ID --logs "[{category:StorageRead,enabled:true}]"
az monitor action-group create --resource-group rg1 --name ag-ops --short-name ops --action email admin admin@contoso.com
az monitor metrics alert create --resource-group rg1 --name cpu-high --scopes VM_ID --condition "avg Percentage CPU > 85" --window-size 15m --evaluation-frequency 5m --severity 2 --action ag-ops</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 15. From a metric to a message</h3>
<p>This follows the official Lab 11. A B1s VM costs about a cent per hour. A workspace ingesting a few megabytes and two alert rules cost cents. Delete everything at the end.</p>
<h3>Part A. A VM and its metrics</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab15</code> and an Ubuntu B1s VM <code>vm1</code>.</li>
<li>Open the VM, <strong>Metrics</strong>, and chart Percentage CPU and Network In Total. Change the time range and aggregation.</li>
</ol>
<h3>Part B. An action group and a metric alert</h3>
<ol>
<li>In Monitor, <strong>Alerts</strong>, <strong>Action groups</strong>, create <code>ag-lab15</code> with an email notification to yourself.</li>
<li>Create an alert rule on vm1: Percentage CPU, average greater than 50, check every minute over 5 minutes, severity 2, action group ag-lab15.</li>
<li>With Run command, run <code>timeout 600 sh -c "while :; do :; done"</code> to load the CPU. Wait for the email.</li>
<li>Open the fired alert, change its user response to Acknowledged, and watch the monitor condition become Resolved after the load ends.</li>
</ol>
<h3>Part C. An activity log alert and a processing rule</h3>
<ol>
<li>Create an alert rule with scope the resource group, signal <strong>Delete Virtual Machine</strong> from the activity log, action group ag-lab15.</li>
<li>Create an <strong>alert processing rule</strong> on the resource group that suppresses notifications for the next hour. Run the CPU load again and confirm the alert fires without an email.</li>
<li>Delete the processing rule.</li>
</ol>
<h3>Part D. Logs and KQL</h3>
<ol>
<li>Create a Log Analytics workspace. On vm1, open <strong>Insights</strong> and enable VM insights with that workspace, which installs the Azure Monitor Agent and a data collection rule.</li>
<li>After 10 to 15 minutes, open <strong>Logs</strong> in the workspace and run the Heartbeat and Perf queries from this lesson.</li>
<li>On the subscription's <strong>Activity log</strong>, choose <strong>Export Activity Logs</strong> and send them to the workspace. Later, query <code>AzureActivity</code>.</li>
</ol>
<h3>Part E. Delete and get notified</h3>
<p>Delete vm1 and confirm the activity log alert email arrives. Then delete the resource group, which also removes the alert rules and action group.</p>`,
      notas: [{ id: "lab15", label: "How long the CPU alert took to fire and to resolve, and the result of your Perf query" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Metrics charted for a VM." },
        { id: "t2", texto: "Metric alert fired and emailed through an action group." },
        { id: "t3", texto: "Alert processing rule suppressed a notification." },
        { id: "t4", texto: "VM insights enabled and KQL queries run in the workspace." },
        { id: "t5", texto: "Activity log alert received after deleting the VM." },
        { id: "t6", texto: "Resource group deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Where is the data",
        enunciado: R`<p>Answer each question about where data is found or how it is collected.</p>`,
        partes: [
          { id: "a", pregunta: "You need to know who deleted a virtual network yesterday. Where do you look first?", tipo: "opcion", respuesta: 0,
            opciones: ["The activity log", "The VM's metrics", "VM insights", "Storage insights"],
            pistas: ["Deletion is a control plane operation."],
            solucion: R`The activity log records every write and delete on resources, with the caller, for 90 days.` },
          { id: "b", pregunta: "You need every read request against a storage account's blobs, with the caller's IP, available for KQL queries. What do you configure?", tipo: "opcion", respuesta: 2,
            opciones: ["Nothing, it is in the activity log", "A metric alert", "A diagnostic setting on the blob service sending StorageRead logs to a Log Analytics workspace", "A storage account lifecycle rule"],
            pistas: ["Data plane logs are not collected until you ask."],
            solucion: R`Resource logs exist only once a diagnostic setting sends them somewhere. A workspace makes them queryable with KQL.` },
          { id: "c", pregunta: "You need the Windows System event log and memory counters of 50 VMs in a workspace. What do you deploy?", tipo: "opcion", respuesta: 1,
            opciones: ["A diagnostic setting on each VM", "The Azure Monitor Agent with a data collection rule", "A Recovery Services vault", "Connection monitor"],
            pistas: ["This data is inside the guest operating system."],
            solucion: R`Guest data is collected by the Azure Monitor Agent, configured by a data collection rule that names the counters and logs and the destination.` },
          { id: "d", pregunta: "Activity log entries must be kept for two years and queried with KQL. What do you do?", tipo: "opcion", respuesta: 3,
            opciones: ["Nothing, the activity log keeps two years", "Create a metric alert", "Enable VM insights", "Create a diagnostic setting on the subscription to a Log Analytics workspace with sufficient retention"],
            pistas: ["The activity log itself keeps 90 days."],
            solucion: R`Export the activity log with a subscription diagnostic setting to a workspace, and set the retention you need.` },
          { id: "e", pregunta: "Logs must be streamed in near real time to a third-party SIEM. Which destination do you choose in the diagnostic setting?", tipo: "opcion", respuesta: 2,
            opciones: ["Storage account", "Log Analytics workspace", "Event Hubs", "Action group"],
            pistas: ["Streaming to something outside Azure."],
            solucion: R`Event Hubs is the streaming destination that external tools consume.` }
        ] },
      { id: "q2", nivel: 2, titulo: "KQL",
        enunciado: R`<p>You work in a Log Analytics workspace with data from Windows and Linux VMs.</p>`,
        partes: [
          { id: "a", pregunta: "Which query lists the computers that have not sent a heartbeat in the last 10 minutes?", tipo: "opcion", respuesta: 1,
            opciones: ["Heartbeat | where TimeGenerated > ago(10m) | project Computer", "Heartbeat | summarize Last = max(TimeGenerated) by Computer | where Last < ago(10m)", "Perf | where CounterName == \"Heartbeat\" | take 10", "Heartbeat | count"],
            pistas: ["First find each computer's latest heartbeat, then filter."],
            solucion: R`Summarize the last heartbeat per computer, then keep those older than ten minutes. The first option lists computers that are alive.` },
          { id: "b", pregunta: "What does this query return? Event | where EventLevelName == \"Error\" | summarize count() by Computer | top 3 by count_", tipo: "opcion", respuesta: 0,
            opciones: ["The three computers with the most error events", "Three random error events", "The number of computers with errors", "The first three events in time"],
            pistas: ["Read it left to right."],
            solucion: R`It filters errors, counts them per computer and keeps the three highest counts.` },
          { id: "c", pregunta: "You want to keep all columns and add a new one called CPUPercent. Which operator?", tipo: "opcion", respuesta: 2,
            opciones: ["project", "summarize", "extend", "where"],
            pistas: ["One operator keeps existing columns, the other replaces them."],
            solucion: R`extend adds a column. project would keep only the columns you list.` },
          { id: "d", pregunta: "Which part of a query groups data into 5-minute intervals for a chart?", tipo: "opcion", respuesta: 3,
            opciones: ["ago(5m)", "take 5", "order by TimeGenerated", "summarize avg(CounterValue) by bin(TimeGenerated, 5m)"],
            pistas: ["Intervals are buckets."],
            solucion: R`bin rounds timestamps into buckets, and summarize aggregates per bucket.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Alerts and action groups",
        enunciado: R`<p>Operations at Contoso have these requirements.</p>`,
        partes: [
          { id: "a", pregunta: "The on-call engineer must receive an SMS and a ticket must be created in the ITSM tool whenever any of 30 alert rules fires. What is the least effort?", tipo: "opcion", respuesta: 1,
            opciones: ["Configure SMS and ITSM in each of the 30 rules separately", "Create one action group with both and use it in all 30 rules", "Create 30 action groups", "Use a workbook"],
            pistas: ["Action groups are reusable."],
            solucion: R`One action group holds both the notification and the action, and every rule refers to it.` },
          { id: "b", pregunta: "Every Saturday from 22:00 to 02:00 servers are patched. Alerts must still be recorded but nobody should be notified. What do you create?", tipo: "opcion", respuesta: 2,
            opciones: ["Delete the alert rules on Saturday and recreate them", "Disable the action group", "An alert processing rule with a recurring schedule that suppresses notifications", "Change the severity to Sev 4"],
            pistas: ["Recorded, but no actions."],
            solucion: R`An alert processing rule with a weekly recurrence suppresses action groups while alerts keep firing and being recorded.` },
          { id: "c", pregunta: "You must be notified if anyone creates a public IP address in the subscription. Which signal type?", tipo: "opcion", respuesta: 0,
            opciones: ["Activity log", "Metric", "Resource health", "Service health"],
            pistas: ["Creating a resource is a control plane operation."],
            solucion: R`An activity log alert on the operation Create or Update Public Ip Address.` },
          { id: "d", pregunta: "You must be notified when Azure plans maintenance or has an outage affecting Virtual Machines in West Europe. Which signal type?", tipo: "opcion", respuesta: 3,
            opciones: ["Metric", "Log search", "Resource health", "Service health"],
            pistas: ["This is about Azure's own status, not your resource."],
            solucion: R`Service health alerts cover incidents, planned maintenance and advisories for services and regions you choose.` },
          { id: "e", pregunta: "Which TWO can an action group do? Select two.", tipo: "multi", respuesta: [0, 2],
            opciones: ["Run an Automation runbook", "Change the severity of the alert", "Call a webhook", "Suppress other alerts"],
            pistas: ["It runs things. Alert processing rules change behaviour."],
            solucion: R`Action groups notify people and run actions such as runbooks, functions, logic apps and webhooks. Suppression is an alert processing rule.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Insights and Network Watcher",
        enunciado: R`<p>Choose the right tool.</p>`,
        partes: [
          { id: "a", pregunta: "You need a map of which processes on your VMs connect to which other servers. What do you enable?", tipo: "opcion", respuesta: 1,
            opciones: ["Storage insights", "VM insights with the map feature", "Activity log export", "IP flow verify"],
            pistas: ["It shows processes and dependencies."],
            solucion: R`VM insights includes a map of processes and their connections.` },
          { id: "b", pregunta: "You must measure latency and packet loss between an on-premises server and an Azure VM every few minutes and alert when loss exceeds 5%. What do you use?", tipo: "opcion", respuesta: 2,
            opciones: ["Connection troubleshoot", "Next hop", "Connection monitor", "Packet capture"],
            pistas: ["Continuous, over time."],
            solucion: R`Connection monitor runs continuous tests, records latency and loss and supports alerts. Connection troubleshoot is a one-time check.` },
          { id: "c", pregunta: "Security wants to record all IP flows through a virtual network for analysis. You try to create NSG flow logs and cannot. What do you create instead?", tipo: "opcion", respuesta: 0,
            opciones: ["Virtual network flow logs", "A packet capture on each VM", "A diagnostic setting on the NSG with flow data", "An activity log alert"],
            pistas: ["NSG flow logs are being retired."],
            solucion: R`Virtual network flow logs replace NSG flow logs, which can no longer be created and retire in September 2027.` },
          { id: "d", pregunta: "You want a visual analysis of the flow logs: top talkers, blocked flows, traffic to malicious IPs. What do you enable?", tipo: "opcion", respuesta: 3,
            opciones: ["VM insights", "Storage insights", "IP flow verify", "Traffic analytics"],
            pistas: ["It processes flow logs in a workspace."],
            solucion: R`Traffic analytics processes flow logs in Log Analytics and visualises them.` },
          { id: "e", pregunta: "You need to see the capacity, transaction count and latency of all storage accounts in one view, without configuring anything. What do you open?", tipo: "opcion", respuesta: 1,
            opciones: ["VM insights", "Storage insights", "Log Analytics with StorageBlobLogs", "Azure Advisor"],
            pistas: ["It is built on platform metrics."],
            solucion: R`Storage insights uses metrics collected automatically, so it works without diagnostic settings.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Metrics</strong> automatic, 93 days. <strong>Activity log</strong> automatic, control plane, 90 days. <strong>Resource logs</strong> only with a diagnostic setting. <strong>Guest data</strong> needs the Azure Monitor Agent and a data collection rule.`,
      R`<strong>Diagnostic setting destinations:</strong> Log Analytics to query, storage to archive, Event Hubs to stream, partner solutions.`,
      R`<strong>KQL:</strong> Table | where | extend or project | summarize ... by bin(TimeGenerated, 5m) | order by | take | render.`,
      R`<strong>Alert rule:</strong> scope, condition, action groups, severity Sev 0 critical to Sev 4. Signals: metric, log search, activity log, resource health, service health.`,
      R`<strong>Action group:</strong> reusable notifications (email, SMS, push, voice, ARM role) and actions (runbook, function, logic app, webhook, ITSM, Event Hub).`,
      R`<strong>Alert processing rule:</strong> suppress notifications (maintenance windows) or add action groups at scale.`,
      R`<strong>Insights:</strong> VM (agent and map), Storage and Network (no setup). <strong>Connection monitor</strong> for continuous tests. <strong>VNet flow logs</strong> replace NSG flow logs. <strong>Traffic analytics</strong> visualises them.`
    ] }
  ]
});

LESSONS.push({
  id: "az-17", n: 17, fase: 5, codigo: "Backup and recovery",
  titulo: "Backup and disaster recovery",
  sub: "Back up VMs, file shares and more with Azure Backup, restore what you need, and fail whole machines over to another region with Site Recovery.",
  horas: "5 hours",
  contexto: "Azure Backup and Azure Site Recovery for AZ-104. Recovery Services vault (Azure VMs, SQL Server and SAP HANA in VMs, Azure Files, MARS agent for on-premises files and folders, MABS and DPM, Site Recovery) versus Backup vault (Azure Disks, Azure Blobs, Azure Database for PostgreSQL, AKS and others). Vault region must match the protected resources for VM backup. Vault storage redundancy LRS, ZRS, GRS (default), changeable only before backups exist; Cross Region Restore. Soft delete (14 days), immutable vault, multi-user authorization with Resource Guard. Backup policy: standard and enhanced, frequency, retention daily weekly monthly yearly, instant restore snapshots. Consistency types. Restore options: create VM, restore disks, replace existing, cross-region, file recovery. Azure Files backup with snapshots. Site Recovery: replication to a secondary region, replication policy, RPO and RTO, test failover, failover, commit, re-protect, failback, recovery plans. Backup reports in Business Continuity Center with diagnostic settings to Log Analytics, built-in Azure Monitor alerts for backup. Official Lab 10.",
  secciones: [
    { id: "concept", titulo: "The idea", html: R`
<p class="lead">Two different promises hide behind the word recovery. <strong>Backup</strong> promises that you can get data back as it was at some moment in the past: yesterday's file, last week's VM. <strong>Disaster recovery</strong> promises that the service keeps running somewhere else, quickly, if a whole region goes dark.</p>
<p>Azure has a service for each. <strong>Azure Backup</strong> takes scheduled copies into a <strong>vault</strong> and keeps them according to a <strong>policy</strong>. <strong>Azure Site Recovery</strong> continuously replicates virtual machines to another region and lets you <strong>fail over</strong> to the copies.</p>
<p>Two numbers frame every discussion. The <strong>recovery point objective</strong>, RPO, is how much data you can afford to lose, measured in time. The <strong>recovery time objective</strong>, RTO, is how long you can afford to be down. A daily backup gives an RPO of up to 24 hours and an RTO of hours. Site Recovery gives an RPO of seconds to minutes and an RTO of minutes.</p>
<div class="nota"><strong>An analogy from your field.</strong> Backup is the nightly copy of each router's configuration to a TFTP server: you can go back to Tuesday's version. Site Recovery is a geographically redundant core with a standby node kept in sync, so traffic moves over when the active site fails. You need both, because replication faithfully copies mistakes too.</div>` },

    { id: "details", titulo: "What you must know", html: R`
<h3>1. Two kinds of vault</h3>
<div class="tabla"><table>
<thead><tr><th>Recovery Services vault</th><th>Backup vault</th></tr></thead>
<tbody>
<tr><td>Azure VMs</td><td>Azure Disks, managed disk snapshots</td></tr>
<tr><td>SQL Server and SAP HANA in Azure VMs</td><td>Azure Blobs</td></tr>
<tr><td>Azure Files</td><td>Azure Database for PostgreSQL</td></tr>
<tr><td>On-premises files and folders with the MARS agent</td><td>Azure Kubernetes Service and other newer workloads</td></tr>
<tr><td>On-premises workloads with MABS or DPM</td><td></td></tr>
<tr><td><strong>Azure Site Recovery</strong></td><td></td></tr>
</tbody></table></div>
<ul>
<li>For Azure VMs, the vault must be in the <strong>same region</strong> as the VMs. Protecting VMs in two regions needs two vaults.</li>
<li>A vault can protect resources from several resource groups in the same subscription and region.</li>
<li><strong>Backup center</strong>, now part of the <strong>Business Continuity Center</strong>, gives one view across all vaults.</li>
</ul>

<h3>2. Vault settings to know</h3>
<ul>
<li><strong>Storage redundancy</strong>: LRS, ZRS or <strong>GRS, the default</strong>. It can only be changed <strong>before</strong> any item is protected.</li>
<li><strong>Cross Region Restore</strong>: with GRS, lets you restore in the paired region at any time, not only when Microsoft declares a disaster.</li>
<li><strong>Soft delete</strong>: deleted backup data is kept for <strong>14 days</strong> by default, at no cost, so it can be undeleted. Enhanced soft delete allows longer retention and making it always on.</li>
<li><strong>Immutable vault</strong>: prevents operations that would delete or shorten the life of recovery points. When locked, it cannot be undone.</li>
<li><strong>Multi-user authorization</strong>: a <strong>Resource Guard</strong>, ideally in another subscription owned by a security team, must approve critical operations such as disabling soft delete.</li>
<li>A vault with protected items, or with soft-deleted items, cannot be deleted. Stop protection, delete the data, wait or undelete and purge, then delete the vault.</li>
</ul>

<h3>3. Backing up Azure VMs</h3>
<ul>
<li>Enabled from the VM, <strong>Backup</strong>, or from the vault. Azure installs a backup extension. No agent to manage.</li>
<li>Each backup first takes a <strong>snapshot</strong>, kept locally for <strong>instant restore</strong>, then transfers the data to the vault. Restores from the snapshot are much faster.</li>
<li>Consistency: <strong>application-consistent</strong> on Windows through VSS, <strong>file-system consistent</strong> on Linux unless you add pre and post scripts, <strong>crash-consistent</strong> when the VM is off.</li>
<li>A backup policy sets the <strong>schedule</strong> and <strong>retention</strong>.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>Policy</th><th>Frequency</th><th>Instant restore snapshots</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Standard</strong></td><td>Daily or weekly</td><td>1 to 5 days</td><td>The classic policy</td></tr>
<tr><td><strong>Enhanced</strong></td><td>Also hourly, several backups a day</td><td>Up to 30 days</td><td>Required for Trusted Launch VMs and some disk types. Microsoft recommends it</td></tr>
</tbody></table></div>
<p>Retention can be set separately for <strong>daily, weekly, monthly and yearly</strong> points, up to 99 years for yearly points. A policy can be used by many VMs, and a VM uses one policy.</p>
<p><strong>Restore options</strong> for a VM:</p>
<div class="tabla"><table>
<thead><tr><th>Option</th><th>Result</th></tr></thead>
<tbody>
<tr><td><strong>Create new VM</strong></td><td>A new VM from the recovery point, with basic settings</td></tr>
<tr><td><strong>Restore disks</strong></td><td>Managed disks plus a template, to build a VM with custom settings, or attach the disks elsewhere</td></tr>
<tr><td><strong>Replace existing</strong></td><td>The current VM's disks are replaced. The VM must exist</td></tr>
<tr><td><strong>Cross Region Restore</strong></td><td>Any of the above in the paired region, with GRS and the feature enabled</td></tr>
<tr><td><strong>File recovery</strong></td><td>Mount the recovery point as drives through a script and copy single files, without restoring the VM</td></tr>
</tbody></table></div>

<h3>4. Other workloads</h3>
<ul>
<li><strong>Azure Files</strong>: snapshot-based backup in a Recovery Services vault, managing the share snapshots of lesson 7, with a vaulted tier that copies data into the vault. You can restore a whole share or individual files, to the original or another location.</li>
<li><strong>MARS agent</strong> (Microsoft Azure Recovery Services agent): installed on Windows machines, on premises or in Azure, to back up <strong>files, folders and system state</strong> directly to a Recovery Services vault. Windows only, up to three backups a day.</li>
<li><strong>MABS</strong> (Azure Backup Server) and System Center DPM: for application workloads on premises such as SQL Server, Exchange and Hyper-V VMs.</li>
<li><strong>Azure Blobs</strong>: operational backup, which keeps data in the source account using point-in-time restore features, and vaulted backup in a Backup vault.</li>
</ul>

<h3>5. Azure Site Recovery</h3>
<ul>
<li>Replicates Azure VMs to another region, and also on-premises VMware, Hyper-V and physical servers to Azure.</li>
<li>For Azure to Azure, the Recovery Services vault is created in the <strong>target</strong> region, not the source. A <strong>cache storage account</strong> in the source region holds changes before they are sent.</li>
<li>A <strong>replication policy</strong> sets how long recovery points are kept and how often application-consistent snapshots are taken. Crash-consistent points are created every few minutes.</li>
<li>When you enable replication, Site Recovery creates the target resource group, virtual network, and disks for you, or uses ones you choose.</li>
</ul>
<div class="tabla"><table>
<thead><tr><th>Operation</th><th>What happens</th></tr></thead>
<tbody>
<tr><td><strong>Test failover</strong></td><td>Creates VMs in the target region in an <strong>isolated</strong> virtual network you choose. Replication continues and production is not affected. Clean up afterwards</td></tr>
<tr><td><strong>Failover</strong></td><td>Starts VMs in the target region from a chosen recovery point: latest, latest processed, latest app-consistent, or a custom point</td></tr>
<tr><td><strong>Commit</strong></td><td>Confirms the failover and deletes the other recovery points</td></tr>
<tr><td><strong>Re-protect</strong></td><td>Starts replicating from the target region back to the original</td></tr>
<tr><td><strong>Failback</strong></td><td>A failover in the opposite direction, after re-protect</td></tr>
</tbody></table></div>
<ul>
<li>A <strong>recovery plan</strong> groups VMs to fail over together, in order, for example database first, then application, then web, with optional scripts or manual steps between groups.</li>
<li>Run a test failover regularly. It is the only way to know your recovery plan works.</li>
</ul>

<h3>6. Reports and alerts</h3>
<ul>
<li><strong>Backup reports</strong> show jobs, usage, policies and trends across vaults. They need each vault's <strong>diagnostic settings</strong> to send data to a <strong>Log Analytics workspace</strong>.</li>
<li><strong>Built-in Azure Monitor alerts</strong> exist for backup failures and for security events such as deleting backup data. Route them to an action group with an alert processing rule or an alert rule.</li>
<li><strong>Backup jobs</strong> in the vault list each backup and restore with its status.</li>
</ul>
<div class="tabla"><pre>az backup vault create --resource-group rg1 --name rsv-weu --location westeurope
az backup vault backup-properties set --resource-group rg1 --name rsv-weu --backup-storage-redundancy LocallyRedundant
az backup protection enable-for-vm --resource-group rg1 --vault-name rsv-weu --vm vm1 --policy-name DefaultPolicy
az backup protection backup-now --resource-group rg1 --vault-name rsv-weu --container-name vm1 --item-name vm1 --backup-management-type AzureIaasVM
az backup job list --resource-group rg1 --vault-name rsv-weu --output table</pre></div>` },

    { id: "lab", titulo: "Hands-on lab", html: R`
<h3>Lab 16. Back up, restore a file, and test a failover</h3>
<p>This follows the official Lab 10. Backup of one small VM costs a few euros per month for the protected instance plus storage. Site Recovery is free for the first 31 days of each protected VM. Disable replication and delete everything when you finish, the same day if possible.</p>
<h3>Part A. A vault and a backup</h3>
<ol>
<li>Create a resource group <code>rg-az104-lab16</code> and an Ubuntu B1s VM <code>vm1</code> in West Europe or your usual region.</li>
<li>Create a Recovery Services vault <code>rsv-lab16</code> in the <strong>same region</strong>. Before anything else, open <strong>Properties</strong>, <strong>Backup configuration</strong>, and set storage redundancy to LRS.</li>
<li>Open <strong>Properties</strong>, <strong>Security settings</strong>, and read soft delete and immutability.</li>
<li>From the vault, choose Backup, Azure, Virtual machine. Create an <strong>Enhanced</strong> policy and select vm1.</li>
<li>Open the protected item and press <strong>Backup now</strong>. Follow the job under <strong>Backup jobs</strong>.</li>
</ol>
<h3>Part B. Restore</h3>
<ol>
<li>When the backup completes, open the item and choose <strong>File Recovery</strong>. Read the steps: download a script, run it on a machine, browse the mounted disks. You do not need to run it.</li>
<li>Choose <strong>Restore VM</strong> and read the options: create new, restore disks, replace existing. Cancel.</li>
</ol>
<h3>Part C. Site Recovery</h3>
<ol>
<li>Create a second Recovery Services vault <code>rsv-lab16-dr</code> in a <strong>different region</strong>, the target.</li>
<li>On vm1, open <strong>Disaster recovery</strong>, choose that target region and accept the defaults. Enable replication and wait until the status is Protected. This can take 30 minutes or more.</li>
<li>Run a <strong>Test failover</strong> using the latest processed point and the test network Site Recovery created. Open the test VM in the target region.</li>
<li>Choose <strong>Cleanup test failover</strong> and confirm the test VM is removed.</li>
</ol>
<h3>Clean up</h3>
<ol>
<li>In the DR vault, disable replication for vm1.</li>
<li>In the backup vault, stop backup for vm1 and delete the backup data. Because of soft delete, the data stays for 14 days. To delete the vault today, disable soft delete first, then undelete and delete the item again, or simply leave the empty vault and delete it later.</li>
<li>Delete the resource groups, including the one Site Recovery created in the target region, usually ending in <code>-asr</code>.</li>
</ol>`,
      notas: [{ id: "lab16", label: "How long the first backup took, and what the test failover created in the target region" }],
      tareasTitulo: "Lab checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Vault created in the VM's region with redundancy set before protecting." },
        { id: "t2", texto: "VM backed up with an enhanced policy." },
        { id: "t3", texto: "File recovery and restore options reviewed." },
        { id: "t4", texto: "Replication to another region enabled." },
        { id: "t5", texto: "Test failover run and cleaned up." },
        { id: "t6", texto: "Replication disabled, backups removed, resource groups deleted." }
      ] },

    { id: "ejercicios", titulo: "Exam questions", ejercicios: [
      { id: "q1", nivel: 1, titulo: "Which vault",
        enunciado: R`<p>Your company runs VMs in West Europe and North Europe, has on-premises Windows file servers, and stores data in blob containers.</p>`,
        partes: [
          { id: "a", pregunta: "What is the minimum number of Recovery Services vaults needed to back up the VMs in both regions?", tipo: "opcion", respuesta: 1,
            opciones: ["1", "2", "3", "4"],
            pistas: ["A vault protects VMs in its own region."],
            solucion: R`One vault per region: two.` },
          { id: "b", pregunta: "Which vault type backs up Azure Blobs with vaulted backup?", tipo: "opcion", respuesta: 2,
            opciones: ["Recovery Services vault", "Key Vault", "Backup vault", "Storage account"],
            pistas: ["The newer vault type."],
            solucion: R`Azure Blobs, Azure Disks and PostgreSQL use a Backup vault.` },
          { id: "c", pregunta: "Folders on an on-premises Windows file server must be backed up directly to Azure with no extra server. What do you install?", tipo: "opcion", respuesta: 0,
            opciones: ["The MARS agent", "The Azure Monitor Agent", "Azure Backup Server", "The Site Recovery Mobility service"],
            pistas: ["Files, folders and system state."],
            solucion: R`The Microsoft Azure Recovery Services agent backs up files, folders and system state from Windows machines to a Recovery Services vault.` },
          { id: "d", pregunta: "You will protect VMs in a new vault and want backups replicated to the paired region. When must you set the storage redundancy?", tipo: "opcion", respuesta: 3,
            opciones: ["At any time", "After the first backup", "Only when creating the resource group", "Before protecting any item"],
            pistas: ["It cannot change once data exists."],
            solucion: R`Redundancy can only be changed before any item is protected. GRS is already the default.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Policies and restores",
        enunciado: R`<p>VM1, a Windows server, is protected with a daily backup policy.</p>`,
        partes: [
          { id: "a", pregunta: "A user deleted one spreadsheet from VM1 yesterday. What is the quickest way to get it back without touching the VM?", tipo: "opcion", respuesta: 1,
            opciones: ["Replace existing VM", "File recovery from a recovery point", "Create new VM and copy the file", "Site Recovery failover"],
            pistas: ["Mount the recovery point and copy one file."],
            solucion: R`File recovery mounts the recovery point's disks through a script so you copy the single file.` },
          { id: "b", pregunta: "You must restore VM1 into a different virtual network with a different size and an extra data disk. Which option?", tipo: "opcion", respuesta: 2,
            opciones: ["Create new VM", "Replace existing", "Restore disks, then build the VM from the disks and template", "File recovery"],
            pistas: ["Create new VM allows only basic settings."],
            solucion: R`Restore disks gives you the managed disks and a template, so you can customise everything before creating the VM.` },
          { id: "c", pregunta: "Backups must run every 4 hours. What do you need?", tipo: "opcion", respuesta: 0,
            opciones: ["An enhanced backup policy", "A standard policy with daily frequency", "Two standard policies on the same VM", "A Backup vault"],
            pistas: ["Only one policy type allows several backups a day."],
            solucion: R`Enhanced policies support hourly schedules. A VM can have only one policy.` },
          { id: "d", pregunta: "Requirements: keep daily points for 30 days, the backup from the last Sunday of each month for 12 months, and the one from the last day of each year for 10 years. Can one policy do this?", tipo: "opcion", respuesta: 3,
            opciones: ["No, you need three policies", "No, yearly retention needs a Backup vault", "Only with Cross Region Restore", "Yes, with daily, monthly and yearly retention in one policy"],
            pistas: ["Retention is set per daily, weekly, monthly and yearly point."],
            solucion: R`A single policy has separate retention ranges for daily, weekly, monthly and yearly points.` },
          { id: "e", pregunta: "An administrator accidentally stopped protection and deleted VM1's backup data 3 days ago. Can it be recovered?", tipo: "opcion", respuesta: 1,
            opciones: ["No, deletion is immediate", "Yes, soft delete keeps it for 14 days by default", "Only if the vault is immutable", "Only with the MARS agent"],
            pistas: ["A safety net that is on by default."],
            solucion: R`Soft delete keeps deleted backup data for 14 days, so you can undelete it and resume protection.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Protecting the backups",
        enunciado: R`<p>The security team worries that an attacker with Owner rights could destroy the backups before encrypting the servers.</p>`,
        partes: [
          { id: "a", pregunta: "Disabling soft delete or reducing retention must require approval from a separate security team. What do you configure?", tipo: "opcion", respuesta: 2,
            opciones: ["A ReadOnly lock on the vault", "A second vault", "Multi-user authorization with a Resource Guard", "An action group"],
            pistas: ["A second party must authorise critical operations."],
            solucion: R`Multi-user authorization uses a Resource Guard, owned by another team, to protect critical vault operations.` },
          { id: "b", pregunta: "Recovery points must never be deleted before their retention ends, by anyone. What do you enable and lock?", tipo: "opcion", respuesta: 0,
            opciones: ["Immutable vault", "Cross Region Restore", "Instant restore", "LRS redundancy"],
            pistas: ["Write once, keep until expiry."],
            solucion: R`A locked immutable vault blocks operations that delete or shorten recovery points. Locking is irreversible.` },
          { id: "c", pregunta: "You try to delete an old vault and the operation fails. Which TWO conditions can cause this? Select two.", tipo: "multi", respuesta: [1, 3],
            opciones: ["The vault uses GRS", "Items are still protected", "The vault has a diagnostic setting", "Soft-deleted backup items remain"],
            pistas: ["A vault must be truly empty."],
            solucion: R`A vault with protected items or with soft-deleted data cannot be deleted.` }
        ] },
      { id: "q4", nivel: 3, titulo: "Site Recovery",
        enunciado: R`<p>A three-tier application runs on VMs in West Europe. It must keep running in North Europe if West Europe fails, with an RPO of minutes.</p>`,
        partes: [
          { id: "a", pregunta: "Why is daily VM backup with Cross Region Restore not enough?", tipo: "opcion", respuesta: 1,
            opciones: ["Backups cannot be restored in another region", "A daily backup gives an RPO of up to 24 hours and a slow RTO", "Backups do not include disks", "Cross Region Restore needs Site Recovery"],
            pistas: ["Compare the objectives."],
            solucion: R`Backup can lose up to a day of data and restoring takes time. Site Recovery replicates continuously, with RPO in minutes.` },
          { id: "b", pregunta: "In which region do you create the Recovery Services vault for Site Recovery?", tipo: "opcion", respuesta: 2,
            opciones: ["West Europe, with the VMs", "Any region", "North Europe, the target", "Both regions, one vault each"],
            pistas: ["The vault must survive the loss of the source."],
            solucion: R`For Azure to Azure replication the vault goes in the target region, so it is available when the source is lost.` },
          { id: "c", pregunta: "You must prove the failover works every quarter without affecting production or stopping replication. What do you run?", tipo: "opcion", respuesta: 0,
            opciones: ["A test failover into an isolated virtual network", "A planned failover", "Re-protect", "Commit"],
            pistas: ["One operation is designed to be harmless."],
            solucion: R`Test failover creates VMs in an isolated network while replication continues. Clean it up afterwards.` },
          { id: "d", pregunta: "The database VM must start before the application VMs, and those before the web VMs. What do you create?", tipo: "opcion", respuesta: 3,
            opciones: ["Three vaults", "An availability set", "A replication policy", "A recovery plan with three groups"],
            pistas: ["Order and grouping of a failover."],
            solucion: R`A recovery plan defines groups that fail over in sequence, with optional scripts and manual actions.` },
          { id: "e", pregunta: "After a real failover to North Europe, West Europe is back. Put the steps to return in order.", tipo: "opcion", respuesta: 2,
            opciones: ["Failback, then commit, then re-protect", "Re-protect, then commit, then failback", "Commit, then re-protect, then failback", "Test failover, then failback"],
            pistas: ["Confirm the failover first.", "You cannot fail back until you replicate back."],
            solucion: R`Commit the failover, re-protect to replicate North Europe back to West Europe, then fail back.` }
        ] },
      { id: "q5", nivel: 2, titulo: "Reports and alerts",
        enunciado: R`<p>Management wants a monthly view of backup usage and job success across 12 vaults, and an email when any backup job fails.</p>`,
        partes: [
          { id: "a", pregunta: "Backup reports show no data. What must you configure on each vault?", tipo: "opcion", respuesta: 1,
            opciones: ["Cross Region Restore", "A diagnostic setting sending data to a Log Analytics workspace", "An enhanced policy", "An immutable vault"],
            pistas: ["Reports are built on logs."],
            solucion: R`Backup reports read from a Log Analytics workspace, fed by each vault's diagnostic settings.` },
          { id: "b", pregunta: "How do you get an email for failed backup jobs with the least effort?", tipo: "opcion", respuesta: 0,
            opciones: ["Use the built-in Azure Monitor alerts for backup and route them to an action group with email", "Write a log search alert for each vault", "Check Backup jobs every morning", "Enable soft delete"],
            pistas: ["Azure Backup already raises alerts for job failures."],
            solucion: R`Built-in Azure Monitor alerts fire for backup failures. An alert processing rule or alert rule sends them to an action group.` }
        ] }
    ] },

    { id: "resumen", titulo: "Cheat sheet", puntos: [
      R`<strong>Backup vs DR:</strong> backup restores the past (RPO hours). Site Recovery keeps running elsewhere (RPO minutes, RTO minutes).`,
      R`<strong>Recovery Services vault:</strong> VMs, SQL and SAP HANA in VMs, Azure Files, MARS, MABS and DPM, Site Recovery. <strong>Backup vault:</strong> Disks, Blobs, PostgreSQL, AKS.`,
      R`<strong>Vault rules:</strong> same region as VMs for backup. Redundancy GRS by default, change only before protecting. Soft delete 14 days. Immutable vault and multi-user authorization for ransomware protection.`,
      R`<strong>VM backup:</strong> snapshot plus vault. Standard (daily) or enhanced (hourly, Trusted Launch). Retention daily, weekly, monthly, yearly in one policy.`,
      R`<strong>Restore:</strong> create new VM, restore disks (custom build), replace existing, cross region, file recovery for single files.`,
      R`<strong>MARS:</strong> Windows files, folders and system state, no extra server.`,
      R`<strong>Site Recovery:</strong> vault in the target region. Test failover in an isolated network. Failover, commit, re-protect, failback. Recovery plans order the VMs.`,
      R`<strong>Reports</strong> need vault diagnostic settings to Log Analytics. Built-in alerts cover job failures.`
    ] }
  ]
});


LESSONS.push({
  id: "az-18", n: 18, fase: 6, codigo: "Practice exam",
  titulo: "Exam technique and practice exam",
  sub: "How to manage 100 minutes, read Microsoft's question formats, avoid the classic traps, and a full practice exam across the five domains.",
  horas: "6 hours",
  contexto: "Final lesson of the AZ-104 course. Exam technique: time management for 100 minutes, question formats (single choice, multiple choice, drag and drop, hot area, yes/no series that cannot be revisited, case studies, possibly interactive tasks), Microsoft Learn access during the exam, marking for review, reading for keywords such as least privilege, minimise cost, least administrative effort. Common traps across the five domains. A final two-week plan. A practice exam of about 50 items weighted by domain.",
  secciones: [
    { id: "concept", titulo: "Exam technique", html: R`
<p class="lead">By now you know the material. This lesson is about getting it onto the answer sheet: reading Microsoft's question formats correctly, spending the 100 minutes well, and not falling into traps that catch people who knew the answer.</p>
<h3>Before you start</h3>
<ul>
<li>The exam has roughly 40 to 60 items. The number and the mix change from one candidate to the next. The score is scaled from 1 to 1,000 and you need <strong>700</strong>.</li>
<li>Some items are worth more than others, and a few unscored items are being tested. You cannot tell which, so treat every one seriously.</li>
<li>There is no penalty for a wrong answer. <strong>Never leave an item blank.</strong></li>
<li>During the exam you can open <strong>Microsoft Learn</strong> in a side window. It is useful to confirm one detail, such as a command parameter. It is far too slow to learn anything, and its time comes out of your 100 minutes.</li>
<li>If English slows you down, you can request extra time as a non-native speaker when you schedule. The exam is also offered in Spanish, but the Azure portal and documentation you will use at work are in English.</li>
</ul>
<h3>Question formats</h3>
<div class="tabla"><table>
<thead><tr><th>Format</th><th>What to know</th></tr></thead>
<tbody>
<tr><td><strong>Single choice</strong></td><td>One correct answer among four or so</td></tr>
<tr><td><strong>Multiple choice</strong></td><td>The question says how many to choose. Partial credit may be given, but do not count on it</td></tr>
<tr><td><strong>Drag and drop</strong>, ordering</td><td>Put commands or steps in order. Often more options than slots</td></tr>
<tr><td><strong>Hot area</strong></td><td>Pick a value in drop-down lists inside a command, a template or a table</td></tr>
<tr><td><strong>Yes or no series</strong></td><td>The same scenario with a different proposed solution in each item. <strong>Once you answer and move on you cannot return.</strong> Each item is judged on its own: several solutions can work</td></tr>
<tr><td><strong>Case study</strong></td><td>A long scenario with tabs (overview, existing environment, requirements) and several questions. Its section is timed together and cannot be revisited after you leave it</td></tr>
</tbody></table></div>
<h3>Spending the time</h3>
<ol>
<li>At the start, look at how many items and sections there are. Aim for about <strong>1.5 minutes per normal question</strong> and keep 20 minutes for case studies.</li>
<li>Answer every question on the first pass. If unsure, choose your best answer, <strong>mark it for review</strong>, and move on.</li>
<li>In a case study, read the <strong>questions first</strong>, then look in the tabs for the requirement each one depends on. Do not read the whole scenario carefully at the beginning.</li>
<li>Use the remaining time for marked items only. Change an answer only if you find a concrete reason.</li>
</ol>
<div class="nota"><strong>Read the qualifier.</strong> Most questions end with a phrase that decides between two technically correct options: <em>minimise cost</em>, <em>minimise administrative effort</em>, <em>least privilege</em>, <em>without downtime</em>, <em>must be possible from on premises</em>. Underline it mentally before reading the options.</div>` },

    { id: "details", titulo: "The classic traps", html: R`
<p>These are the distinctions that turn up again and again. Each line points back to the lesson that explains it.</p>
<h3>Identity and governance</h3>
<ul>
<li>Microsoft Entra roles manage the <strong>directory</strong>. Azure RBAC roles manage <strong>resources</strong>. Global Administrator does not give access to subscriptions unless elevated. Lessons 2 and 3.</li>
<li>Assigning roles needs <strong>Owner</strong>, <strong>User Access Administrator</strong> or <strong>Role Based Access Control Administrator</strong>. Contributor cannot. Lesson 3.</li>
<li>Policy evaluates; it does not delete existing resources. Deny blocks new ones. <strong>Modify</strong> and <strong>DeployIfNotExists</strong> need a remediation task for existing resources. Lesson 4.</li>
<li>Tags are <strong>not inherited</strong>. Locks <strong>are</strong>. A ReadOnly lock on a storage account blocks listing its keys. Lesson 4.</li>
<li>A budget <strong>alerts</strong>; it never stops resources by itself. Lesson 4.</li>
</ul>
<h3>Storage</h3>
<ul>
<li><strong>RA-</strong> in the redundancy name is what gives read access to the secondary. Lesson 5.</li>
<li>To revoke SAS tokens without regenerating keys, use a <strong>stored access policy</strong>. A user delegation SAS is signed with Entra credentials. Lesson 6.</li>
<li>Archive is offline. Cool, cold and archive have minimum stays. Lifecycle rules take up to 24 hours. Lesson 7.</li>
</ul>
<h3>Compute</h3>
<ul>
<li>Stopped is still billed; <strong>stopped (deallocated)</strong> is not. Lesson 9.</li>
<li>An existing VM cannot join an availability set. Lesson 10.</li>
<li>Scale out if <strong>any</strong> rule, scale in if <strong>all</strong> rules. Lesson 10.</li>
<li>Slots and autoscale start at <strong>Standard</strong>. The plan is what you pay for. Lesson 12.</li>
<li>Container Instances has no autoscale; Container Apps does, down to zero. Lesson 11.</li>
</ul>
<h3>Networking</h3>
<ul>
<li>Peering is <strong>not transitive</strong> and needs non-overlapping addresses. Lesson 13.</li>
<li>Five reserved addresses per subnet. Lesson 13.</li>
<li>Inbound: subnet NSG then NIC NSG. Both must allow. Lesson 14.</li>
<li>Private endpoint works from on premises and needs a privatelink DNS zone. Service endpoint does not and does not. Lesson 14.</li>
<li>Standard load balancers and public IPs are closed until an NSG allows. Probes come from <strong>AzureLoadBalancer</strong>. Lesson 15.</li>
</ul>
<h3>Monitoring and recovery</h3>
<ul>
<li>Resource logs need a <strong>diagnostic setting</strong>. Guest data needs the <strong>Azure Monitor Agent</strong>. Lesson 16.</li>
<li>Maintenance window means <strong>alert processing rule</strong>. Lesson 16.</li>
<li>Backup vault in the <strong>same</strong> region as the VMs; Site Recovery vault in the <strong>target</strong> region. Lesson 17.</li>
<li>Test failover is the harmless one. Commit, re-protect, failback, in that order. Lesson 17.</li>
</ul>` },

    { id: "lab", titulo: "The final two weeks", html: R`
<h3>A plan for the last 14 days</h3>
<p>With about 5 hours a week, the last two weeks are about 10 hours. Spend them like this:</p>
<ol>
<li><strong>Day 1.</strong> Take the practice exam in this lesson in one sitting, with a 100-minute timer and no notes. Record the score per domain.</li>
<li><strong>Days 2 to 7.</strong> For your two weakest domains, reread the cheat sheets, redo the exam questions of those lessons, and repeat the labs you skipped.</li>
<li><strong>Day 8.</strong> Take Microsoft's free <strong>practice assessment</strong> for AZ-104, now hosted on AI Skills Navigator at <a href="http://aka.ms/AZ104-PA" target="_blank" rel="noopener">aka.ms/AZ104-PA</a>. It is the best source of questions in the real style. The older practice assessments on Microsoft Learn are no longer updated.</li>
<li><strong>Days 9 to 12.</strong> Review the traps list above and the cheat sheets of all 18 lessons. Redo only the questions you got wrong.</li>
<li><strong>Day 13.</strong> If you will sit the exam from home, run the system test of the exam provider and prepare a clean desk and identity document.</li>
<li><strong>Day 14.</strong> Rest. A tired brain misreads qualifiers.</li>
</ol>
<h3>Useful official resources</h3>
<ul>
<li>The AZ-104 <strong>study guide</strong>, with the current skills measured, on Microsoft Learn. Check it for changes before the exam.</li>
<li>The free <strong>practice assessment</strong> at <a href="http://aka.ms/AZ104-PA" target="_blank" rel="noopener">aka.ms/AZ104-PA</a>.</li>
<li>The <strong>exam sandbox</strong>, to try the question formats.</li>
<li>The official labs, at <code>microsoftlearning.github.io/AZ-104-MicrosoftAzureAdministrator</code>, which these lessons followed.</li>
</ul>
<h3>After you pass</h3>
<p>The certification is valid for one year. Renewal is a free online assessment on Microsoft Learn, opened six months before expiry, which you can retake as often as needed.</p>`,
      notas: [{ id: "final", label: "Your practice exam score per domain, and the date you plan to sit the real exam" }],
      tareasTitulo: "Final checklist",
      tareasIntro: "",
      tareas: [
        { id: "t1", texto: "Practice exam in this lesson taken under exam conditions." },
        { id: "t2", texto: "Two weakest domains reviewed and their labs repeated." },
        { id: "t3", texto: "Microsoft's official practice assessment completed with 80% or more." },
        { id: "t4", texto: "Exam scheduled, with extra time requested if wanted." },
        { id: "t5", texto: "System test passed, or test centre booked." }
      ] },

    { id: "ejercicios", titulo: "Practice exam", ejercicios: [
      { id: "q1", nivel: 2, titulo: "Domain 1. Identities",
        enunciado: R`<p>Contoso has a Microsoft Entra tenant with Microsoft Entra ID P1 licences and one Azure subscription.</p>`,
        partes: [
          { id: "a", pregunta: "A help desk employee must create users and reset passwords for non-administrators, nothing more. Which role?", tipo: "opcion", respuesta: 2,
            opciones: ["Global Administrator", "Owner on the subscription", "User Administrator", "Contributor on the subscription"],
            pistas: ["It is a directory task, so a Microsoft Entra role."],
            solucion: R`User Administrator manages users and groups and resets passwords of non-administrators. Owner and Contributor are Azure resource roles.` },
          { id: "b", pregunta: "Every user whose department attribute is Sales must be added to a group automatically. What do you create?", tipo: "opcion", respuesta: 0,
            opciones: ["A security group with dynamic user membership", "A Microsoft 365 group with assigned membership", "An administrative unit", "A conditional access policy"],
            pistas: ["Membership driven by a rule."],
            solucion: R`A dynamic membership rule such as user.department -eq "Sales" keeps the group up to date. It requires P1, which Contoso has.` },
          { id: "c", pregunta: "A consultant from a partner company must access an Azure resource using their own company account. What do you do?", tipo: "opcion", respuesta: 3,
            opciones: ["Create a cloud user in your tenant and send them the password", "Create a new tenant for the partner", "Give them the subscription ID", "Invite them as a guest user with B2B collaboration and assign an RBAC role"],
            pistas: ["They keep their own identity."],
            solucion: R`A guest invitation lets the consultant sign in with their own account. You then assign the RBAC role they need.` }
        ] },
      { id: "q2", nivel: 2, titulo: "Domain 1. Access",
        enunciado: R`<p>User1 has these role assignments: <strong>Reader</strong> on the subscription and <strong>Contributor</strong> on the resource group RG1. The subscription also contains RG2.</p>`,
        partes: [
          { id: "a", pregunta: "User1 can create a virtual machine in RG1.", tipo: "opcion", respuesta: 0,
            opciones: ["Yes", "No"],
            pistas: ["Contributor at RG1 applies to everything in RG1."],
            solucion: R`Yes. Assignments are additive, and Contributor on RG1 allows creating resources there.` },
          { id: "b", pregunta: "User1 can create a virtual machine in RG2.", tipo: "opcion", respuesta: 1,
            opciones: ["Yes", "No"],
            pistas: ["What does User1 have at RG2?"],
            solucion: R`No. In RG2 User1 only inherits Reader from the subscription.` },
          { id: "c", pregunta: "User1 can grant User2 the Reader role on RG1.", tipo: "opcion", respuesta: 1,
            opciones: ["Yes", "No"],
            pistas: ["Contributor excludes one kind of action."],
            solucion: R`No. Contributor cannot manage access. That needs Owner, User Access Administrator or Role Based Access Control Administrator.` },
          { id: "d", pregunta: "Where do you check every role assignment that applies to User1, including inherited ones, for RG1?", tipo: "opcion", respuesta: 2,
            opciones: ["The activity log", "Microsoft Entra audit logs", "RG1, Access control (IAM), Check access", "Azure Advisor"],
            pistas: ["Interpret access assignments."],
            solucion: R`Check access on Access control (IAM) shows the assignments for a user at that scope, inherited ones included.` }
        ] },
      { id: "q3", nivel: 2, titulo: "Domain 1. Governance",
        enunciado: R`<p>You govern a subscription with 200 existing resources.</p>`,
        partes: [
          { id: "a", pregunta: "You assign the built-in policy Allowed locations with West Europe only. Twelve existing resources are in North Europe. What happens to them?", tipo: "opcion", respuesta: 1,
            opciones: ["They are deleted", "They are reported as non-compliant and keep running", "They are moved to West Europe", "The assignment fails"],
            pistas: ["Policy does not destroy."],
            solucion: R`Existing resources are evaluated and shown as non-compliant. Only new or updated resources are denied.` },
          { id: "b", pregunta: "Every resource must get the CostCenter tag of its resource group, including existing resources. What do you use?", tipo: "opcion", respuesta: 3,
            opciones: ["A CanNotDelete lock", "Tag the resource groups only, since tags are inherited", "A budget", "The policy Inherit a tag from the resource group, with a remediation task"],
            pistas: ["Tags are not inherited by default.", "Existing resources need remediation."],
            solucion: R`The Modify policy adds the tag on create and update, and a remediation task applies it to existing resources.` },
          { id: "c", pregunta: "A ReadOnly lock is applied to a storage account. Which operation fails?", tipo: "opcion", respuesta: 2,
            opciones: ["Reading blobs with a SAS token", "Viewing the account in the portal", "Listing the account access keys", "Viewing the account's metrics"],
            pistas: ["Listing keys is technically a POST operation."],
            solucion: R`Listing keys is a write-type operation, so a ReadOnly lock blocks it, which also breaks portal features that rely on keys.` },
          { id: "d", pregunta: "Finance wants an email when spending in RG-Dev reaches 80% of 500 euros a month. What do you create?", tipo: "opcion", respuesta: 0,
            opciones: ["A budget on RG-Dev with an alert condition at 80% and an action group or email", "An Azure Policy with Deny", "A metric alert on the VMs", "A ReadOnly lock at 80%"],
            pistas: ["Cost Management feature."],
            solucion: R`A budget with an alert threshold notifies by email or action group. It does not stop resources.` }
        ] },
      { id: "q4", nivel: 2, titulo: "Domain 2. Storage accounts",
        enunciado: R`<p>You design storage for a document application.</p>`,
        partes: [
          { id: "a", pregunta: "Data must survive the loss of a datacentre and of a region, and the application must be able to read from the secondary region at any time. Which redundancy?", tipo: "opcion", respuesta: 3,
            opciones: ["ZRS", "GRS", "GZRS", "RA-GZRS"],
            pistas: ["Zones, plus geo, plus read access."],
            solucion: R`RA-GZRS combines zone redundancy in the primary, a secondary region and read access to it.` },
          { id: "b", pregunta: "Partners receive SAS tokens. You must be able to revoke a group of tokens at once without regenerating the account keys. What do you use?", tipo: "opcion", respuesta: 1,
            opciones: ["Account SAS tokens with short expiry", "Service SAS tokens linked to a stored access policy", "Anonymous access", "A ReadOnly lock"],
            pistas: ["Something on the server that tokens refer to."],
            solucion: R`Changing or deleting the stored access policy revokes every SAS that references it.` },
          { id: "c", pregunta: "You must copy 2 TB of blobs from one storage account to another, from a script, as fast as possible. Which tool?", tipo: "opcion", respuesta: 0,
            opciones: ["AzCopy", "The portal's upload button", "Azure Backup", "Lifecycle management"],
            pistas: ["A command-line copy tool for storage."],
            solucion: R`AzCopy copies between accounts server to server and is designed for scripts and large volumes.` },
          { id: "d", pregunta: "Blobs in account A must be copied asynchronously to account B in another region. Which TWO must be enabled? Select two.", tipo: "multi", respuesta: [0, 2],
            opciones: ["Blob versioning on both accounts", "Hierarchical namespace on both accounts", "Change feed on the source account", "Archive tier on the destination"],
            pistas: ["Object replication has prerequisites on versioning and change feed."],
            solucion: R`Object replication needs versioning on source and destination and change feed on the source.` }
        ] },
      { id: "q5", nivel: 2, titulo: "Domain 2. Files and data protection",
        enunciado: R`<p>Users map an Azure file share as drive S: and store project files in blob containers.</p>`,
        partes: [
          { id: "a", pregunta: "Users must sign in to the share with their hybrid identities, without a domain controller in Azure. Which identity source?", tipo: "opcion", respuesta: 2,
            opciones: ["Storage account key", "On-premises AD DS reached over VPN only", "Microsoft Entra Kerberos", "Anonymous access"],
            pistas: ["The cloud-based Kerberos option."],
            solucion: R`Microsoft Entra Kerberos authenticates hybrid identities to Azure Files without domain controllers in Azure.` },
          { id: "b", pregunta: "Someone deleted the entire share. Which feature would have let you restore it?", tipo: "opcion", respuesta: 1,
            opciones: ["Blob versioning", "Soft delete for file shares", "Container soft delete", "Point-in-time restore for blobs"],
            pistas: ["Soft delete has separate switches per data type."],
            solucion: R`Soft delete for file shares keeps deleted shares for the configured number of days.` },
          { id: "c", pregunta: "Every overwrite of a blob must keep the previous content automatically. What do you enable?", tipo: "opcion", respuesta: 0,
            opciones: ["Blob versioning", "Blob snapshots", "Archive tier", "Immutability"],
            pistas: ["Automatic, on every write."],
            solucion: R`Versioning keeps a previous version automatically on each overwrite or delete. Snapshots are taken manually.` }
        ] },
      { id: "q6", nivel: 2, titulo: "Domain 3. Templates and VMs",
        enunciado: R`<p>You manage compute for a web shop.</p>`,
        partes: [
          { id: "a", pregunta: "You deploy a Bicep file to RG-Shop with az deployment group create and no mode. RG-Shop has a VM not in the file. What happens to it?", tipo: "opcion", respuesta: 1,
            opciones: ["It is deleted", "It is left unchanged", "It is stopped", "The deployment fails"],
            pistas: ["Default mode."],
            solucion: R`Incremental mode, the default, leaves resources not in the template alone.` },
          { id: "b", pregunta: "A VM must be resized to a size not listed for it in the portal. What do you do first?", tipo: "opcion", respuesta: 3,
            opciones: ["Detach the data disks", "Move it to another resource group", "Enable encryption at host", "Deallocate it"],
            pistas: ["The list depends on the current hardware cluster."],
            solucion: R`Deallocating releases the VM from its cluster so every size in the region becomes available.` },
          { id: "c", pregunta: "Two VMs must give a 99.99% connectivity SLA. How do you deploy them?", tipo: "opcion", respuesta: 2,
            opciones: ["In one availability set", "In one proximity placement group", "In two different availability zones", "With Premium SSD disks"],
            pistas: ["The highest VM SLA."],
            solucion: R`Two or more VMs across two or more zones carry 99.99%.` },
          { id: "d", pregunta: "A scale set has minimum 2, maximum 6. Rules: scale out by 2 if CPU above 75%; scale out by 1 if queue longer than 50. Current count is 5, CPU 80% and queue 10. How many instances after evaluation?", tipo: "opcion", respuesta: 1,
            opciones: ["5", "6", "7", "8"],
            pistas: ["Any scale-out rule triggers.", "The maximum caps it."],
            solucion: R`The CPU rule triggers and asks for 7, but the maximum is 6.` }
        ] },
      { id: "q7", nivel: 2, titulo: "Domain 3. Containers and App Service",
        enunciado: R`<p>Choose the best option for each.</p>`,
        partes: [
          { id: "a", pregunta: "An App Service app needs a staging slot and autoscale at the lowest cost. Which tier?", tipo: "opcion", respuesta: 1,
            opciones: ["Basic", "Standard", "Premium v3", "Isolated v2"],
            pistas: ["Both features start at the same tier."],
            solucion: R`Standard is the lowest tier with slots and autoscale.` },
          { id: "b", pregunta: "After a slot swap, production must keep using its production database connection string. What do you do?", tipo: "opcion", respuesta: 3,
            opciones: ["Use swap with preview", "Store the string in the code", "Use a separate plan for staging", "Mark the connection string as a deployment slot setting"],
            pistas: ["Sticky settings."],
            solucion: R`A deployment slot setting stays with its slot during a swap.` },
          { id: "c", pregunta: "A container must run a nightly 5-minute job, retry if it fails, and stop billing when done. Which service and restart policy?", tipo: "opcion", respuesta: 0,
            opciones: ["Azure Container Instances with OnFailure", "Azure Container Instances with Always", "Azure Container Registry with Never", "App Service with Always On"],
            pistas: ["Per-second billing and retry on error."],
            solucion: R`Container Instances bills per second, and OnFailure retries failures and stops after success.` },
          { id: "d", pregunta: "An App Service app must reach a database VM through its private IP in a virtual network. What do you configure on the app?", tipo: "opcion", respuesta: 2,
            opciones: ["A private endpoint", "Access restrictions", "Virtual network integration", "A custom domain"],
            pistas: ["Outbound from the app."],
            solucion: R`Virtual network integration handles outbound calls from the app into the virtual network.` }
        ] },
      { id: "q8", nivel: 2, titulo: "Domain 4. Networking",
        enunciado: R`<p>Hub-and-spoke: <strong>Hub</strong> 10.0.0.0/16 with a VPN gateway to the office, <strong>Spoke1</strong> 10.1.0.0/16 and <strong>Spoke2</strong> 10.2.0.0/16, each peered only with Hub.</p>`,
        partes: [
          { id: "a", pregunta: "VMs in Spoke1 can reach VMs in Spoke2 with no further configuration.", tipo: "opcion", respuesta: 1,
            opciones: ["Yes", "No"],
            pistas: ["Is peering transitive?"],
            solucion: R`No. Peering is not transitive. You need a Spoke1 to Spoke2 peering, or an appliance in Hub with user-defined routes.` },
          { id: "b", pregunta: "Spoke1 must reach the office through Hub's VPN gateway. On the Spoke1 side of the peering, which setting do you enable?", tipo: "opcion", respuesta: 2,
            opciones: ["Allow gateway transit", "Allow forwarded traffic only", "Use remote gateways", "Allow virtual network access only"],
            pistas: ["The spoke borrows the gateway."],
            solucion: R`Use remote gateways on the spoke, with Allow gateway transit on the hub.` },
          { id: "c", pregunta: "Spoke1's internet traffic must pass through a firewall at 10.0.1.4 in Hub. What do you create?", tipo: "opcion", respuesta: 0,
            opciones: ["A route table on Spoke1's subnets with 0.0.0.0/0 to Virtual appliance 10.0.1.4", "An NSG rule to 10.0.1.4", "A NAT gateway on Hub", "A private DNS zone"],
            pistas: ["Changing the path of traffic means routing."],
            solucion: R`A user-defined route for 0.0.0.0/0 with next hop Virtual appliance sends internet traffic to the firewall.` },
          { id: "d", pregunta: "Office users must reach a storage account in Azure over the VPN with public access disabled. What do you deploy?", tipo: "opcion", respuesta: 3,
            opciones: ["A service endpoint in Hub", "A Basic public IP", "A shared access signature", "A private endpoint with a privatelink DNS zone resolvable from the office"],
            pistas: ["Service endpoints do not work from on premises."],
            solucion: R`A private endpoint gives the account a private IP reachable over VPN. DNS must resolve it to that IP from the office.` }
        ] },
      { id: "q9", nivel: 2, titulo: "Domain 4. Security and load balancing",
        enunciado: R`<p>A Standard public load balancer distributes TCP 443 to two VMs in Subnet-Web. NSG-Web on Subnet-Web has one custom inbound rule at priority 4000 denying all traffic.</p>`,
        partes: [
          { id: "a", pregunta: "Both backends show as unhealthy. Which inbound rule must you add with a priority below 4000?", tipo: "opcion", respuesta: 1,
            opciones: ["Allow from VirtualNetwork", "Allow from the AzureLoadBalancer service tag", "Allow from Internet on 3389", "Allow from Storage"],
            pistas: ["The probe's source."],
            solucion: R`Health probes come from AzureLoadBalancer. The custom deny at 4000 overrides the default rule at 65001.` },
          { id: "b", pregunta: "Clients still cannot connect after the probes are healthy. Which inbound rule is missing?", tipo: "opcion", respuesta: 2,
            opciones: ["Allow from VirtualNetwork on 443", "Allow from AzureLoadBalancer on 443", "Allow from Internet on TCP 443", "Allow from Internet on 22"],
            pistas: ["Standard is closed by default for client traffic."],
            solucion: R`Client traffic from Internet on 443 must be allowed explicitly.` },
          { id: "c", pregunta: "Administrators need SSH to the two VMs, which have no public IP, through the browser. What do you deploy?", tipo: "opcion", respuesta: 0,
            opciones: ["Azure Bastion in AzureBastionSubnet", "Inbound NAT rules on port 22 from Internet", "A NAT gateway", "A VPN gateway in Subnet-Web"],
            pistas: ["A managed jump host."],
            solucion: R`Bastion gives SSH and RDP through the portal over TLS without public IPs on the VMs.` },
          { id: "d", pregunta: "The root domain contoso.com, hosted in Azure DNS, must point to the load balancer's public IP and follow it if it changes. What record?", tipo: "opcion", respuesta: 3,
            opciones: ["CNAME at the apex", "MX record", "PTR record", "Alias A record at the apex targeting the public IP resource"],
            pistas: ["Apex, Azure resource, follows changes."],
            solucion: R`An alias A record can sit at the apex and track the Azure public IP resource.` }
        ] },
      { id: "q10", nivel: 2, titulo: "Domain 5. Monitor and recover",
        enunciado: R`<p>Operations requirements for the same environment.</p>`,
        partes: [
          { id: "a", pregunta: "You must be emailed whenever a VM in the subscription is deleted. Which TWO do you create? Select two.", tipo: "multi", respuesta: [0, 3],
            opciones: ["An activity log alert rule for Delete Virtual Machine", "A metric alert on Percentage CPU", "A diagnostic setting on each VM", "An action group with an email notification"],
            pistas: ["Control plane event, and someone to notify."],
            solucion: R`An activity log alert detects the deletion and an action group sends the email.` },
          { id: "b", pregunta: "No alerts should notify anyone during the second Sunday of each month from 01:00 to 05:00, but alerts must still be recorded. What do you create?", tipo: "opcion", respuesta: 2,
            opciones: ["Disable all alert rules monthly", "Delete the action group", "An alert processing rule with a schedule that suppresses notifications", "A budget"],
            pistas: ["Maintenance windows."],
            solucion: R`An alert processing rule with a recurring schedule suppresses actions while alerts keep firing.` },
          { id: "c", pregunta: "VMs in West Europe must be backed up daily. Where must the Recovery Services vault be?", tipo: "opcion", respuesta: 1,
            opciones: ["In the paired region", "In West Europe", "In any region", "In the same resource group as the VMs"],
            pistas: ["VM backup and region."],
            solucion: R`The vault must be in the same region as the VMs. The resource group can differ.` },
          { id: "d", pregunta: "The DR plan for those VMs must be validated without affecting production. What do you run in Site Recovery?", tipo: "opcion", respuesta: 0,
            opciones: ["Test failover", "Failover and commit", "Re-protect", "Cross Region Restore"],
            pistas: ["The harmless operation."],
            solucion: R`A test failover creates VMs in an isolated network while replication continues.` },
          { id: "e", pregunta: "Which KQL query counts error events per computer in the last day?", tipo: "opcion", respuesta: 3,
            opciones: ["Event | take 1d | count by Computer", "Event | project Computer, count() | where ago(1d)", "Perf | where EventLevelName == \"Error\" | summarize count()", "Event | where TimeGenerated > ago(1d) and EventLevelName == \"Error\" | summarize count() by Computer"],
            pistas: ["Filter first, then aggregate by computer."],
            solucion: R`where filters by time and level, summarize count() by Computer aggregates. Error events are in the Event table, not Perf.` }
        ] },
      { id: "q11", nivel: 3, titulo: "Case study. Fabrikam Logistics",
        enunciado: R`<p><strong>Overview.</strong> Fabrikam Logistics has a head office in Madrid connected to Azure by a site-to-site VPN. All resources are in one subscription, in West Europe.</p>
<p><strong>Existing environment.</strong> The virtual network VNet-Core, 10.10.0.0/16, has subnets Apps, 10.10.1.0/24, and Data, 10.10.2.0/24. A SQL Server VM runs in Data. A storage account named fabrikamdocs holds shipping documents. An App Service app named tracking runs in a Basic plan.</p>
<p><strong>Requirements.</strong></p>
<ol>
<li>Developers must be able to test new versions of tracking and release them without downtime.</li>
<li>tracking must read from the SQL Server VM over its private address.</li>
<li>fabrikamdocs must not be reachable from the internet. Madrid users must reach it over the VPN.</li>
<li>The SQL Server VM must be recoverable in North Europe within 30 minutes of a regional outage, losing at most a few minutes of data.</li>
<li>Members of the Logistics-Ops group must be able to restart VMs in the subscription but not create or delete them. Use least privilege.</li>
<li>Minimise administrative effort.</li>
</ol>`,
        partes: [
          { id: "a", pregunta: "For requirement 1, what must you change first?", tipo: "opcion", respuesta: 2,
            opciones: ["Nothing, Basic supports slots", "Move tracking to a container", "Scale the plan up to Standard or higher and add a staging slot", "Create a second app in the same plan"],
            pistas: ["Slots and their minimum tier."],
            solucion: R`Deployment slots need Standard or higher. With a staging slot, a swap releases without downtime.` },
          { id: "b", pregunta: "For requirement 2, what do you configure?", tipo: "opcion", respuesta: 0,
            opciones: ["Virtual network integration for tracking, using a dedicated delegated subnet in VNet-Core", "A private endpoint for tracking in Data", "A service endpoint for Microsoft.Web on Data", "A public IP on the SQL Server VM"],
            pistas: ["The app initiates the connection."],
            solucion: R`Outbound access from the app to private addresses is virtual network integration, which needs its own delegated subnet.` },
          { id: "c", pregunta: "For requirement 3, which TWO actions are needed? Select two.", tipo: "multi", respuesta: [1, 2],
            opciones: ["Enable a service endpoint for Microsoft.Storage on Apps", "Create a private endpoint for fabrikamdocs in VNet-Core and integrate it with a privatelink private DNS zone", "Disable public network access on fabrikamdocs", "Set fabrikamdocs to RA-GRS"],
            pistas: ["Reachable over VPN, and closed to the internet."],
            solucion: R`The private endpoint gives a private IP reachable over VPN, with DNS resolving to it, and disabling public access closes the internet path.` },
          { id: "d", pregunta: "For requirement 4, what do you use?", tipo: "opcion", respuesta: 3,
            opciones: ["Daily Azure Backup with Cross Region Restore", "An availability set", "A second VM in another availability zone", "Azure Site Recovery replicating the VM to North Europe"],
            pistas: ["Recovery in another region, RPO minutes, RTO 30 minutes."],
            solucion: R`Site Recovery replicates continuously to North Europe, meeting an RPO of minutes and an RTO well within 30 minutes. Backup has an RPO of up to a day.` },
          { id: "e", pregunta: "For requirement 5, what do you assign to Logistics-Ops at subscription scope?", tipo: "opcion", respuesta: 1,
            opciones: ["Virtual Machine Contributor", "A custom role with Microsoft.Compute/virtualMachines/restart/action and read permissions", "Contributor", "Owner"],
            pistas: ["Built-in VM Contributor can also create and delete."],
            solucion: R`Virtual Machine Contributor allows creating and deleting VMs. A custom role with only the restart and read actions meets least privilege.` }
        ] }
    ] },

    { id: "resumen", titulo: "Last-day cheat sheet", puntos: [
      R`<strong>Format:</strong> 100 minutes, 700 to pass, no penalty for guessing. Yes or no series and case studies cannot be revisited.`,
      R`<strong>Method:</strong> read the qualifier first, answer everything on the first pass, mark doubts, return only to marked items.`,
      R`<strong>Identity:</strong> Entra roles for the directory, RBAC for resources. Only Owner, User Access Administrator and RBAC Administrator assign roles.`,
      R`<strong>Governance:</strong> Policy reports, does not delete. Tags not inherited, locks are. Budgets only alert.`,
      R`<strong>Storage:</strong> RA- to read the secondary. Stored access policy to revoke SAS. Archive is offline.`,
      R`<strong>Compute:</strong> deallocate to stop paying and to see all sizes. Zones 99.99%. Slots and autoscale from Standard.`,
      R`<strong>Networking:</strong> peering not transitive. Five reserved addresses. Both NSGs must allow. Private endpoint for on premises.`,
      R`<strong>Monitor and recover:</strong> diagnostic settings for resource logs. Alert processing rules for maintenance. Backup vault in the VM's region, Site Recovery vault in the target region.`
    ] }
  ]
});

})();
