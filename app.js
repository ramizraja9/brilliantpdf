document.addEventListener('DOMContentLoaded', () => {
    const toolsGrid = document.getElementById('tools-grid');
    const heroSection = document.getElementById('hero-section');
    const uploadSection = document.getElementById('upload-section');
    const uploadTitle = document.getElementById('upload-title');
    const fileInput = document.getElementById('file-input');
    const fileRequirements = document.getElementById('file-requirements');
    const selectedFilesInfo = document.getElementById('selected-files-info');
    const dropArea = document.getElementById('drop-area');
    const backButton = document.getElementById('back-to-tools');

    const toolCards = document.querySelectorAll('.tool-card');

    // Function to show upload section and hide tools
    function showUploadSection(toolName, acceptTypes, isMultiple) {
        heroSection.classList.add('hidden');
        toolsGrid.classList.add('hidden');
        uploadSection.classList.remove('hidden');

        uploadTitle.textContent = `Upload Your File(s) for ${toolName}`;
        fileInput.accept = acceptTypes;
        fileInput.multiple = isMultiple;
        fileRequirements.textContent = `Accepted file types: ${acceptTypes}`;
        selectedFilesInfo.textContent = ''; // Clear previous selection
    }

    // Function to show tools and hide upload section
    function showToolsGrid() {
        heroSection.classList.remove('hidden');
        toolsGrid.classList.remove('hidden');
        uploadSection.classList.add('hidden');
    }

    // Event Listeners for Tool Cards
    toolCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Prevent any default behavior
            e.preventDefault();
            e.stopPropagation();
            
            const toolName = card.getAttribute('data-tool-name');
            const acceptTypes = card.getAttribute('data-accept-types');
            const isMultiple = card.getAttribute('data-multiple') === 'true';
            
            console.log(`Clicked tool: ${toolName}, accepts: ${acceptTypes}, multiple: ${isMultiple}`);
            
            showUploadSection(toolName, acceptTypes, isMultiple);
        });
    });

    // Event Listener for Back Button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        showToolsGrid();
    });

    // Handle File Input Change
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        if (files.length > 0) {
            let fileNames = Array.from(files).map(file => file.name).join(', ');
            selectedFilesInfo.textContent = `Selected: ${fileNames}`;
            // In a real application, you would now send these files to your Java backend
            console.log('Files selected:', files);
        } else {
            selectedFilesInfo.textContent = '';
        }
    });

    // Drag and Drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('border-red-600', 'bg-red-50');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('border-red-600', 'bg-red-50');
        }, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        // Assign files to the hidden input
        fileInput.files = files;

        // Manually trigger the change event for the file input
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    }
});