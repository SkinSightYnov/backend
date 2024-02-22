# alertmanager_cleanup.sh
echo "Starting cleanup of Prometheus Alert Manager Kubernetes setup..."

echo "Deleting alertmanager configmap..."
kubectl delete -f alert-manager-configmap.yaml

echo "Deleting alertmanager templates configmap..."
kubectl delete -f alert-template-configmap.yaml

echo "Deleting alertmanager deployment..."
kubectl delete -f alert-manager-deployment.yaml

echo "Deleting alertmanager service..."
kubectl delete -f alert-manager-service.yaml

echo "Cleanup of Prometheus Alert Manager Kubernetes setup completed."
