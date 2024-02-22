# node_exporter_deploy.sh
echo "Starting Node-exporter Kubernetes setup..."

echo "Creating Node-exporter daemonset..."
kubectl create -f node-exporter-daemonset.yaml

echo "Creating Node-exporter service..."
kubectl apply -f node-exporter-service.yaml

echo "Node-exporter Kubernetes setup completed."
