const createnav=()=>{
    let nav=document.querySelector('.topbar');

    nav.innerHTML=`
    <ul>
        <li><img src="website-icon.png" alt="Website icon"></li>
        <li><a href=>Home</a></li>
        <li><a href=>Comments</a></li>
        <li><a href=>Store</a></li>
        <li><a href=>Quiz</a></li>
        <li><a href=>Site map</a></li>
        <li><a href=>gallery</a></li>
        <li style="float:right;" ><a href=>About us</a></li>
    </ul>
    `;

}

createnav();