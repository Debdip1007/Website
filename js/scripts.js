window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$','$$'], ['\\[','\\]']],
    processEscapes: true,
    tags: 'ams'
  }
};

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

// Dropdown navigation menu
document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById('dropdown-nav-btn');
    var menu = document.getElementById('dropdown-nav-menu');
    if (btn && menu) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
                btn.classList.remove('open');
            } else {
                menu.style.display = 'block';
                btn.classList.add('open');
            }
        });
        // Hide dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
                btn.classList.remove('open');
            }
        });
        // Prevent menu from closing when clicking inside
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Navigation for resource subpages
document.addEventListener("DOMContentLoaded", function() {
    function showSubpage(id) {
        document.querySelectorAll('.resource-subpage').forEach(function(div) {
            div.style.display = 'none';
        });
        document.getElementById(id).style.display = 'block';
        window.scrollTo(0, 0);
        updateSectionNav(id);
    }
    var menuInternship = document.getElementById('menu-internship');
    var menuQuantum = document.getElementById('menu-quantum');
    if (menuInternship) {
        menuInternship.addEventListener('click', function(e) {
            e.preventDefault();
            showSubpage('subpage-internship');
        });
    }
    if (menuQuantum) {
        menuQuantum.addEventListener('click', function(e) {
            e.preventDefault();
            showSubpage('subpage-quantum');
        });
    }

    // Section navigation panel logic
    function updateSectionNav(subpageId) {
        var nav = document.getElementById('section-nav');
        nav.innerHTML = '';
        var subpage = document.getElementById(subpageId);
        if (!subpage) return;

        // Find all sections with id and their headings
        var allSections = [];
        var nodes = subpage.querySelectorAll('.section[id], h2[id], h3[id], h4[id]');
        nodes.forEach(function(node) {
            var id = node.id;
            if (!id) return;
            var heading = node.querySelector('h2, h3, h4, h5, h6') || node;
            var text = heading.textContent || id;
            var level = 2;
            var tag = heading.tagName || node.tagName;
            var m = tag.match(/^H([2-6])$/i);
            if (m) level = parseInt(m[1]);
            allSections.push({id, text, level, node});
        });

        if (allSections.length === 0) {
            nav.style.display = 'none';
            return;
        }

        // Build navigation with dropdown subsections for h3/h4 under h2
        var ul = document.createElement('ul');
        ul.className = 'section-nav-list';
        var i = 0;
        while (i < allSections.length) {
            var sec = allSections[i];
            if (sec.level === 2) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = '#' + sec.id;
                a.textContent = sec.text;
                // No onclick handler, use default anchor behavior

                li.appendChild(a);

                // Look ahead for h3/h4 subsections
                var subUl = null;
                var j = i + 1;
                var foundSub = false;
                while (j < allSections.length && allSections[j].level > 2) {
                    if (!subUl) {
                        subUl = document.createElement('ul');
                        subUl.className = 'section-nav-list subsection-nav-list';
                    }
                    foundSub = true;
                    var subSec = allSections[j];
                    var subLi = document.createElement('li');
                    var subA = document.createElement('a');
                    subA.href = '#' + subSec.id;
                    subA.textContent = subSec.text;
                    // No onclick handler, use default anchor behavior
                    subLi.appendChild(subA);
                    subUl.appendChild(subLi);
                    j++;
                }
                if (foundSub) {
                    li.classList.add('has-dropdown');
                    li.appendChild(subUl);
                    // No dropdown toggle on click, just default anchor
                }
                ul.appendChild(li);
                i = j;
            } else {
                i++;
            }
        }
        nav.appendChild(ul);
        nav.style.display = 'block';
    }

    // Expose globally for single-page reports
    window.updateSectionNav = updateSectionNav;

    // On load, show nav for default subpage if present
    if (document.getElementById('subpage-internship')) {
        updateSectionNav('subpage-internship');
    } else if (document.getElementById('subpage-quantum')) {
        updateSectionNav('subpage-quantum');
    }
});

// ...existing code from all <script> blocks in report.html...
