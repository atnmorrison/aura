<aura:application preload="ui,aura,performanceTest" render="client">
    <ui:button label="Push component to page" press="{!c.pushComponent}"/>
    <div aura:id="placeHolder" class="placeholder"/>
</aura:application>