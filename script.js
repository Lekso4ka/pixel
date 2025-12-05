
class Scrollbar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.content = this.container.querySelector('.scroll');
        this.thumb = this.container.querySelector('.scroll-thumb');
        this.track = this.container.querySelector('.scroll-track');
        
        this.init();
    }
    
    init() {
        this.updateThumbSize();
        this.content.addEventListener('scroll', () => this.updateThumbPosition());
        this.thumb.addEventListener('mousedown', (e) => this.startDrag(e));
        window.addEventListener('resize', () => this.updateThumbSize());
        this.updateThumbPosition();
    }
    
    updateThumbSize() {
        const contentHeight = this.content.scrollHeight;
        const containerHeight = this.content.clientHeight;
        const trackHeight = this.track.clientHeight;
        const thumbHeight = Math.max(
            40,
            (containerHeight / contentHeight) * trackHeight
        );
        this.thumb.style.height = `${thumbHeight}px`;
    }
    
    updateThumbPosition() {
        const scrollTop = this.content.scrollTop;
        const contentHeight = this.content.scrollHeight;
        const containerHeight = this.content.clientHeight;
        const trackHeight = this.track.clientHeight;
        const thumbHeight = this.thumb.clientHeight;
        const maxTop = trackHeight - thumbHeight;
        const thumbTop = (scrollTop / (contentHeight - containerHeight)) * maxTop;
        this.thumb.style.top = `${thumbTop}px`;
    }
    
    startDrag(e) {
        e.preventDefault();
        const startY = e.clientY;
        const startTop = parseFloat(this.thumb.style.top) || 0;
        const onMouseMove = (e) => {
            const deltaY = e.clientY - startY;
            const trackHeight = this.track.clientHeight;
            const thumbHeight = this.thumb.clientHeight;
            const maxTop = trackHeight - thumbHeight;
            let newTop = startTop + deltaY;
            newTop = Math.max(0, Math.min(maxTop, newTop));
            this.thumb.style.top = `${newTop}px`;
            const contentHeight = this.content.scrollHeight;
            const containerHeight = this.content.clientHeight;
            const scrollTop = (newTop / maxTop) * (contentHeight - containerHeight);
            this.content.scrollTop = scrollTop;
        };
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
}

new Scrollbar('scroll1');
new Scrollbar('scroll2');