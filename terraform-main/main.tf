resource "azurerm_resource_group" "rg_app" {
  name     = "${var.app_name}-rg"
  location = var.location
}

######################
# Cognitive Services #
######################

resource "azurerm_cognitive_account" "text_translation" {
  name                = "${var.app_name}-CS-tt"
  location            = azurerm_resource_group.rg_app.location
  resource_group_name = azurerm_resource_group.rg_app.name
  kind                = "TextTranslation"

  sku_name = "F0"

}

#############
# Key Vault #
#############

resource "azurerm_key_vault" "keyvault" {
  name                        = "${var.app_name}-kv"
  resource_group_name         = azurerm_resource_group.rg_app.name
  location                    = azurerm_resource_group.rg_app.location
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "create",
      "get",
      "purge",
      "recover",
      "restore",
      "update"
    ]

    secret_permissions = [
      "set",
      "get",
      "list",
      "delete",
      "purge",
      "recover",
      "restore"
    ]

    storage_permissions = ["Get", "List", "Update", "Purge"]
  }
}

#####################
# Key Vault Secrets #
#####################

resource "azurerm_key_vault_secret" "subscription-id" {
  name         = "${var.app_name}-MICROSOFT-TRANSLATOR-SUBSCRIPTION-KEY"
  value        = azurerm_cognitive_account.text_translation.primary_access_key
  key_vault_id = azurerm_key_vault.keyvault.id
}

resource "azurerm_key_vault_secret" "translator-location" {
  name         = "${var.app_name}-MICROSOFT-TRANSLATOR-LOCATION"
  value        = azurerm_cognitive_account.text_translation.location
  key_vault_id = azurerm_key_vault.keyvault.id
}

resource "azurerm_key_vault_secret" "aws-secret" {
  name         = "aws-secret"
  value        = var.aws_secret
  key_vault_id = azurerm_key_vault.keyvault.id
}

resource "azurerm_key_vault_secret" "aws-key" {
  name         = "aws-key"
  value        = var.aws_key
  key_vault_id = azurerm_key_vault.keyvault.id
}
